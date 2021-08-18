import flowers from "../../../images/test-images/flowers.jpeg";
import trees from "../../../images/test-images/trees.jpeg";

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
  ];
}
