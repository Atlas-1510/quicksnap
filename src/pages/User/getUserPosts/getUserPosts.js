import redFlowers from "../../../images/test-images/redFlowers.jpg"; // TODO: remove test images
import beach from "../../../images/test-images/beach.jpeg";
import plane from "../../../images/test-images/plane.jpeg";
import watch from "../../../images/test-images/watch.jpeg";
import flowers from "../../../images/test-images/flowers.jpeg";
import trees from "../../../images/test-images/trees.jpeg";

// TODO: implement tests for getUserPosts

export default function getUserPosts(userID) {
  return [
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
    // {
    //   file: flowers,
    //   id: "some image ID 5",
    // },
    // {
    //   file: trees,
    //   id: "some image ID 6",
    // },
    // {
    //   file: redFlowers,
    //   id: "some image ID 7",
    // },
    // {
    //   file: watch,
    //   id: "some image ID 8",
    // },
    // {
    //   file: beach,
    //   id: "some image ID 9",
    // },
    // {
    //   file: plane,
    //   id: "some image ID 10",
    // },
    // {
    //   file: flowers,
    //   id: "some image ID 11",
    // },
    // {
    //   file: trees,
    //   id: "some image ID 12",
    // },
  ];
}
