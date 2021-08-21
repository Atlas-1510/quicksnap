import flowers from "../../../images/test-images/flowers.jpeg";
import trees from "../../../images/test-images/trees.jpeg";
import smallImage from "../../../images/test-images/testUserProfile2.jpg";

export default function getLikedPosts(userID) {
  return [
    {
      file: flowers,
      id: "some image ID 5",
    },
    {
      file: trees,
      id: "some image ID 6",
    },
    {
      file: smallImage,
      id: "small image ID",
    },
  ];
}
