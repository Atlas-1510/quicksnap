import React, { useContext } from "react";
import Card from "../../components/Card";
import RightSideBox from "../../components/RightSideBox";
import davidBarrell from "../../images/test-images/RightSideBox/david.barrell.png";
import deshith from "../../images/test-images/RightSideBox/deshith.png";
import lisa from "../../images/test-images/RightSideBox/lisamwill.png";
import { UserContext } from "../Main";
import useUpdateFeed from "./useUpdateFeed/useUpdateFeed";
import Camera from "../../images/SVG/Camera";

function Home({ setCurrentPage }) {
  const user = useContext(UserContext);
  const feed = useUpdateFeed(user.uid);

  const followSuggestions = [
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
  return (
    <div className="flex flex-col">
      {/* Mobile Header */}
      <nav className="relative flex md:hidden justify-center items-center w-full bg-white border-b border-gray-300 py-1">
        <div className="w-7 m-2 absolute left-0">
          <Camera />
        </div>
        <h1 className="font-curly text-4xl m-1">QuickSnap</h1>
      </nav>
      <RightSideBox
        user={user}
        followSuggestions={followSuggestions}
        setCurrentPage={setCurrentPage}
      />
      <div className="w-full lg:w-3/5 mt-2 md:mt-auto">
        {feed &&
          feed.map((card) => (
            <Card key={card.id} card={card} setCurrentPage={setCurrentPage} />
          ))}
      </div>
    </div>
  );
}

export default Home;
