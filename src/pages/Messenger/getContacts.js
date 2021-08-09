import davidBarrell from "../../images/test-images/RightSideBox/david.barrell.png";
import deshith from "../../images/test-images/RightSideBox/deshith.png";
import lisa from "../../images/test-images/RightSideBox/lisamwill.png";

export default function getContacts() {
  return [
    {
      id: "random ID 1",
      userName: "david.barrell",
      image: davidBarrell,
    },
    {
      id: "random ID 2",
      userName: "deshith",
      image: deshith,
    },
    {
      id: "random ID 3",
      userName: "lisamwil",
      image: lisa,
    },
  ];
}
