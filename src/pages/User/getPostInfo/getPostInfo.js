// TODO: Relocate this so that it can be used by the Home page to get get post information for each Card component

// TODO: Make tests for getPostInfo

import testUserProfile from "../../../images/test-images/RightSideBox/userProfileImage.jpg";
import watch from "../../../images/test-images/watch.jpeg";
import redFlowers from "../../../images/test-images/redFlowers.jpg"; // TODO: remove test images

export default function getPostInfo(id) {
  // TODO: replace "faked" dynamic return below with a call to firebase to get info for an image based on ID

  let info;

  switch (id) {
    case "some image ID 1":
      info = {
        id,
        author: {
          name: "iamjasona",
          profileImage: testUserProfile,
        },
        image: redFlowers,
        comments: [
          {
            author: "thehazelhayes",
            content: "gardens and shalas and domes, oh my!",
            id: "random ID 1",
          },
          {
            author: "oebephay",
            content: "oh hell yeaaaah 🔥",
            id: "random ID 2",
          },
          {
            author: "indstagram",
            content: "Such a cool pic!",
            id: "random ID 3",
          },
        ],
        likeCount: 999,
      };
      break;
    case "some image ID 2":
      info = {
        id,
        author: {
          name: "iamjasona",
          profileImage: testUserProfile,
        },
        image: watch,
        comments: [
          {
            author: "watchenthusiase",
            content: "something about watches",
            id: "random ID 1",
          },
          {
            author: "watchguy2",
            content: "⏱",
            id: "random ID 2",
          },
          {
            author: "another guy",
            content: "I LUVE WATCHES",
            id: "random ID 3",
          },
        ],
        likeCount: 6,
      };
      break;
    default:
      console.log(
        "Image id not found, mock data only available for redFlowers and watch posts"
      );
      info = {
        id,
        author: {
          name: "NOT ENTERED",
          profileImage: testUserProfile,
        },
        image: watch,
        comments: [],
        likeCount: 0,
      };
  }

  return info;
}
