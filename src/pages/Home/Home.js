import React, { useContext } from "react";
import Card from "../../components/Card";
import RightSideBox from "../../components/RightSideBox";

import davidBarrell from "../../images/test-images/RightSideBox/david.barrell.png";
import deshith from "../../images/test-images/RightSideBox/deshith.png";
import lisa from "../../images/test-images/RightSideBox/lisamwill.png";

import { UserContext } from "../Main";

import useUpdateFeed from "./useUpdateFeed/useUpdateFeed";

function Home() {
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
      <RightSideBox user={user} followSuggestions={followSuggestions} />
      <div className="w-full lg:w-3/5 mt-2 md:mt-auto">
        {feed && feed.map((card) => <Card key={card.id} card={card} />)}
      </div>
    </div>
  );
}

export default Home;
