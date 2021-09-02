import React from "react";

import Heart from "../images/SVG/Heart/Heart";
import PaperAirplane from "../images/SVG/PaperAirplane/PaperAirplane";
import TextBubble from "../images/SVG/TextBubble";
import Bookmark from "../images/SVG/Bookmark/Bookmark";
import ThreeDots from "../images/SVG/ThreeDots";
import { Link } from "react-router-dom";

function Card({ card }) {
  const { author, image, comments, likeCount } = card;

  return (
    <div className="flex flex-col md:border border-gray-300 rounded-sm md:mt-7 text-sm">
      <div className="flex justify-between bg-white h-12 items-center">
        <div className="mx-3 flex items-center">
          <img
            className="w-8 h-8 md:border rounded-full"
            src={author.profileImage}
            alt="Author profile"
          />
          <Link to={`/view-user/${author.id}`}>
            <span className="mx-3">{author.name}</span>
          </Link>
        </div>
        <div className="w-7 m-2">
          <ThreeDots />
        </div>
      </div>
      <div>
        <img src={image} alt="None" />
      </div>
      <div className="flex flex-col bg-white text-gray-700">
        <div className="flex justify-between">
          <div className="flex">
            <div className="w-8 m-2">
              <Heart />
            </div>
            <div className="w-8 m-2">
              <TextBubble />
            </div>
            <div className="w-8 m-2">
              <PaperAirplane />
            </div>
          </div>
          <div className="w-8 m-2">
            <Bookmark />
          </div>
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
