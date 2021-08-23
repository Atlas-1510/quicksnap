import { fireEvent, render, screen } from "@testing-library/react";
import User from "./User";
import { UserContext } from "../../App";
import testUserProfileImage from "../../images/test-images/testUserProfileImage.jpg";
import getUserPosts from "./getUserPosts/getUserPosts";
import getLikedPosts from "./getLikedPosts/getLikedPosts";
import redFlowers from "../../images/test-images/redFlowers.jpg"; // TODO: remove redFlowers
import beach from "../../images/test-images/beach.jpeg";
import plane from "../../images/test-images/plane.jpeg";
import watch from "../../images/test-images/watch.jpeg";
import flowers from "../../images/test-images/flowers.jpeg";
import trees from "../../images/test-images/trees.jpeg";

import { auth } from "../../firebase/firebase";

jest.mock("./getUserPosts/getUserPosts");
jest.mock("./getLikedPosts/getLikedPosts");
jest.mock("../../firebase/firebase", () => ({
  __esModule: true,
  auth: {
    signOut: jest.fn(),
  },
}));

describe("User", () => {
  let instance;

  beforeEach(() => {
    getUserPosts.mockReturnValue([
      {
        file: redFlowers,
        id: "some image ID 1",
      },
      {
        file: watch,
        id: "some image ID 2",
      },
      {
        file: beach,
        id: "some image ID 3",
      },
      {
        file: plane,
        id: "some image ID 4",
      },
    ]);
    getLikedPosts.mockReturnValue([
      {
        file: flowers,
        id: "some image ID 5",
      },
      {
        file: trees,
        id: "some image ID 6",
      },
    ]);
    instance = render(
      <UserContext.Provider
        value={{
          id: 1,
          name: "iamjasona",
          displayImage: testUserProfileImage,
          postCount: 18,
          followerCount: 74,
          followingCount: 134,
        }}
      >
        <User />
      </UserContext.Provider>
    );
  });

  it("renders", () => {
    const userName = screen.getByText("iamjasona");
    expect(userName).toBeTruthy();
  });

  it("gets user posts when loaded", () => {
    expect(getUserPosts.mock.calls.length).toBe(1);
    const testImageOne = screen.getByTestId("some image ID 1");
    expect(testImageOne).toBeTruthy();
  });

  it("gets liked posts when loaded", () => {
    expect(getLikedPosts.mock.calls.length).toBe(1);
    const showLiked = screen.getByTestId("test-show-liked-button");
    fireEvent.click(showLiked);
    const testImageFive = screen.getByTestId("some image ID 5");
    expect(testImageFive).toBeTruthy();
  });

  it("shows post/follower/following counts from user context", () => {
    const posts = screen.getByTestId("test-posts");
    expect(posts).toHaveTextContent("18 posts");
    const followers = screen.getByTestId("test-followers");
    expect(followers).toHaveTextContent("74 followers");
    const following = screen.getByTestId("test-following");
    expect(following).toHaveTextContent("134 following");
  });

  it("activates log out function when log out button is clicked", () => {
    const button = screen.getByText("Log Out");
    fireEvent.click(button);
    expect(auth.signOut).toHaveBeenCalled();
  });

  it("opens image modal when a user's uploaded image is clicked", () => {
    const thumbnail = screen.getByTestId("some image ID 1");
    fireEvent.click(thumbnail);
    const image = screen.getByTestId("test-image-modal-desktop");
    expect(image.src).toContain(redFlowers);
    expect(image).toBeTruthy();
  });
});
