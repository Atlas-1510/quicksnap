import React from "react";
import ThreeDots from "../../../images/SVG/ThreeDots";
import Heart from "../../../images/SVG/Heart/Heart";
import PaperAirplane from "../../../images/SVG/PaperAirplane/PaperAirplane";
import Bookmark from "../../../images/SVG/Bookmark/Bookmark";
import ChevronLeft from "../../../images/SVG/ChevronLeft";

function Mobile({
  post,
  exit,
  initCommentSubmit,
  setCommentInput,
  commentInput,
}) {
  return (
    <div
      className=" bg-white absolute top-0 w-full h-full"
      data-testid="test-messenger-mobile"
    >
      <div className="border-b border-gray-300 flex  items-center justify-between py-2">
        <div className="mx-2 w-7" onClick={() => exit()}>
          <ChevronLeft />
        </div>
        <div className="mx-3 flex items-center">
          <img
            className="w-8 h-8 md:border rounded-full"
            src={post.author.profileImage}
            alt="Author profile"
          />
          <span className="mx-3">{post.author.name}</span>
        </div>
        <div className="w-7 m-2">
          <ThreeDots />
        </div>
      </div>
      <div className="flex flex-col text-sm">
        <img
          className="col-start-1 col-span-2 min-w-full"
          data-testid="test-image-modal-desktop"
          src={post.image}
          alt="Full size view of clicked thumbnail"
        />

        <div className="flex flex-col bg-white text-gray-700 flex-grow">
          <div className="flex justify-between">
            <div className="flex">
              <div className="w-8 m-2">
                <Heart />
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
            <span className="font-bold">{post.likeCount} others</span>
          </span>
          <div className="mx-3 mt-1 mb-3 flex-grow">
            {post.comments.map((comment) => (
              <div key={comment.id}>
                <span className="font-bold ">{comment.author.name}</span>
                <span> {comment.content}</span>
              </div>
            ))}
          </div>
          <div className="flex p-1 border-t border-gray-200">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full p-2  focus:outline-none focus:ring-1 focus:border-blue-300 border-0 rounded-md"
              value={commentInput}
              onChange={(e) => {
                setCommentInput(e.target.value);
              }}
            />
            <button
              className="mx-3 text-blue-500 font-semibold cursor-pointer"
              onClick={(e) => initCommentSubmit(e)}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mobile;
