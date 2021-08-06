import React from "react";

import Heart from "../images/SVG/Heart";
import PaperAirplane from "../images/SVG/PaperAirplane";
import TextBubble from "../images/SVG/TextBubble";
import Bookmark from "../images/SVG/Bookmark";
import ThreeDots from "../images/SVG/ThreeDots";

function Card({ card }) {
  const { author, image, comments, likeCount } = card;

  return (
    <div className="flex flex-col border border-gray-300 rounded-sm mt-7">
      <div className="flex justify-between bg-white h-12 items-center">
        <div className="mx-3 flex items-center">
          <img
            className="w-8 h-8 border rounded-full"
            src={author.profileImage}
            alt="Author profile"
          />
          <span className="mx-3">{author.name}</span>
        </div>
        <ThreeDots />
      </div>
      <div>
        <img src={image} alt="None" />
      </div>
      <div className="flex flex-col bg-white text-gray-700">
        <div className="flex justify-between">
          <div className="flex">
            <Heart />
            <TextBubble />
            <PaperAirplane />
          </div>
          <Bookmark />
        </div>
        <span className="mx-3 my-1">
          Liked by <span className="font-bold">XYZ</span> and{" "}
          <span className="font-bold">{likeCount} others</span>
        </span>
        <div className="mx-3 mt-1 mb-3">
          {comments.map((comment) => (
            <div key={comment.id}>
              <span className="font-bold ">{comment.author}</span>
              <span> {comment.content}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
