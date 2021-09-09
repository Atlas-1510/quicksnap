import React, { useState, useContext } from "react";

import Heart from "../images/SVG/Heart/Heart";
import PaperAirplane from "../images/SVG/PaperAirplane/PaperAirplane";
import Bookmark from "../images/SVG/Bookmark/Bookmark";
import ThreeDots from "../images/SVG/ThreeDots";
import { Link } from "react-router-dom";
import { UserContext } from "../pages/Main";
import submitComment from "../utils/submitComment/submitComment";
import updatePost from "../utils/updatePost/updatePost";
import useGetPostHeartStatus from "../hooks/useGetPostHeartStatus/useGetPostHeartStatus";
import likePost from "../utils/likePost/likePost";
import unlikePost from "../utils/unlikePost/unlikePost";
import getLikedByInfo from "../utils/getLikedByInfo/getLikedByInfo";
import LikedByModal from "./LikedByModal/LikedByModal";
import useWindowSize from "../hooks/useWindowSize/useWindowSize";

// TODO: Add timestamp display to post

function Card({ card }) {
  const { width } = useWindowSize();
  const [post, setPost] = useState(card);
  const { author, image, comments, likeCount, id } = post;
  const { uid, name } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState("");
  const [likeCountDisplay, setLikeCountDisplay] = useState(likeCount);
  const liked = useGetPostHeartStatus(uid, id);
  const [showLikedByModal, setShowLikedByModal] = useState(false);
  const [likedByInfo, setLikedByInfo] = useState(null);

  const handleLikeChange = async (e) => {
    e.preventDefault();
    if (liked) {
      await unlikePost(uid, id);
      setLikeCountDisplay(likeCountDisplay - 1);
    } else {
      await likePost(uid, id);
      setLikeCountDisplay(likeCountDisplay + 1);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (commentInput !== "") {
      await submitComment(id, uid, name, commentInput);
      const post = await updatePost(id);
      setPost(post);
      setCommentInput("");
    }
  };

  const handleShowLikedByModal = async () => {
    const info = await getLikedByInfo(id);
    setLikedByInfo(info);
    setShowLikedByModal(true);
  };

  return (
    <>
      <div className="flex flex-col md:border border-gray-300 rounded-sm mb-3 md:mt-7 text-sm ">
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
              <div
                className="w-8 m-2 cursor-pointer"
                onClick={(e) => handleLikeChange(e)}
              >
                <Heart liked={liked} />
              </div>
              <div className="w-8 m-2">
                <PaperAirplane />
              </div>
            </div>
            <div className="w-8 m-2">
              <Bookmark />
            </div>
          </div>
          <div onClick={handleShowLikedByModal}>
            {likeCountDisplay === 1 && (
              <span className="mx-3 my-1">
                Liked by{" "}
                <span className="font-bold cursor-pointer">
                  {likeCountDisplay} user
                </span>
              </span>
            )}
            {likeCountDisplay > 1 && (
              <span className="mx-3 my-1">
                Liked by{" "}
                <span className="font-bold cursor-pointer">
                  {likeCountDisplay} users
                </span>
              </span>
            )}
          </div>
          <div className="mx-3 mt-1 mb-3 max-h-20 overflow-y-scroll">
            {comments &&
              comments.map((comment) => (
                <div key={comment.id}>
                  <Link
                    to={
                      comment.author.id === uid
                        ? "/user"
                        : `/view-user/${comment.author.id}`
                    }
                  >
                    <span className="font-bold ">{comment.author.name}</span>
                  </Link>
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
              onClick={(e) => handleSubmitComment(e)}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      {showLikedByModal && (
        <LikedByModal
          exit={() => setShowLikedByModal(false)}
          width={width}
          likedByInfo={likedByInfo}
        />
      )}
    </>
  );
}

export default Card;
