import { fireEvent, render, screen } from "@testing-library/react";
import User from "./User";
import { UserContext } from "../Main";
import testUserProfileImage from "../../images/test-images/testUserProfileImage.jpg";
import useGetUserPosts from "../../hooks/useGetUserPosts/useGetUserPosts";
import getLikedPosts from "./getLikedPosts/getLikedPosts";
import getPostInfo from "../../utils/getPostInfo/getPostInfo";
import redFlowers from "../../images/test-images/redFlowers.jpg";
import plane from "../../images/test-images/plane.jpeg";

import { auth } from "../../firebase/firebase";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

// Note: Some tests encapsulated in async/await blocks due to issue outlined here:
// https://github.com/facebook/react/issues/15379

jest.mock("../../components/ImageModal/ImageModal", () => () => (
  <div>
    <span>Mock Image Modal</span>
    <img data-testid={"test-image-modal-desktop"} src={"test_source"} />
  </div>
));
jest.mock("../../hooks/useGetUserPosts/useGetUserPosts", () => jest.fn());
jest.mock("./getLikedPosts/getLikedPosts", () => jest.fn());
jest.mock("../../utils/getPostInfo/getPostInfo", () => jest.fn());
jest.mock("../../firebase/firebase", () => ({
  __esModule: true,
  auth: {
    signOut: jest.fn(),
  },
}));

describe("User", () => {
  let instance;

  beforeEach(async () => {
    jest.clearAllMocks();
    useGetUserPosts.mockReturnValue([
      {
        id: "testID",
        image: plane,
      },
    ]);
    getLikedPosts.mockReturnValue([
      {
        id: "testID",
        image: redFlowers,
      },
    ]);
    getPostInfo.mockReturnValue({
      author: {
        id: "testAuthorID",
        name: "testName",
        profileImage: testUserProfileImage,
      },
      comments: [
        {
          author: "testCommentAuthor",
          content: "testCommentContent",
          id: "testCommentID",
        },
      ],
      createdAt: "testTimeStamp",
      image: plane,
      likeCount: 0,
    });
    await act(async () => {
      instance = render(
        <MemoryRouter>
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
        </MemoryRouter>
      );
    });
  });

  it("renders", async () => {
    const userName = screen.getByText("iamjasona");
    expect(userName).toBeTruthy();
  });

  it("gets user posts when loaded", () => {
    expect(useGetUserPosts.mock.calls.length).toBe(1);
    const testImageOne = screen.getByTestId("testID");
    expect(testImageOne).toBeTruthy();
  });

  it("gets liked posts when loaded", async () => {
    await act(async () => {
      const showLiked = await screen.findByTestId("test-show-liked-button");
      fireEvent.click(showLiked);
    });
    expect(getLikedPosts.mock.calls.length).toBe(1);

    const testImage = screen.getByTestId("testID");
    expect(testImage).toBeTruthy();
  });

  it("shows post/follower/following counts from user context", async () => {
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

  it("opens image modal when a user's uploaded image is clicked", async () => {
    const thumbnail = screen.getByTestId("testID");
    fireEvent.click(thumbnail);
    const image = await screen.findByTestId("test-image-modal-desktop");
    expect(image.src).toContain("test_source");
  });
});
