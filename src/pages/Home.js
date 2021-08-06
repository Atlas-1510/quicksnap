import React from "react";
import Header from "../components/Header";
import Card from "../components/Card";

import testImage from "../images/test-images/road.jpeg";
import testImage2 from "../images/test-images/shells.jpeg";
import testUserProfile from "../images/test-images/testUserProfile.png";
import testUserProfile2 from "../images/test-images/testUserProfile2.jpg";

function Home() {
  const cards = [
    {
      id: "random ID 1",
      author: {
        name: "Shansazz",
        profileImage: testUserProfile,
      },
      image: testImage,
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
    },
    {
      id: "random ID 2",
      author: {
        name: "shes.the.fran",
        profileImage: testUserProfile2,
      },
      image: testImage2,
      comments: [
        {
          author: "doddleoddle",
          content: "CLEAN UR MIRROR",
          id: "random ID 1",
        },
        {
          author: "bernyoung",
          content: "Best critique",
          id: "random ID 2",
        },
        {
          author: "modern_minimal_navy",
          content: "Give me some room to breath",
          id: "random ID 3",
        },
      ],
      likeCount: 999,
    },
  ];
  return (
    <>
      <Header />
      <div className=" min-h-full bg-gray-200 grid grid-cols-11">
        <div className=" col-start-3 col-span-4 ">
          {cards && cards.map((card) => <Card key={card.id} card={card} />)}
        </div>
      </div>
    </>
  );
}

export default Home;
