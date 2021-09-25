import React, { useState, useContext, useEffect } from "react";

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
import unsavePost from "../utils/unsavePost/unsavePost";
import savePost from "../utils/savePost/savePost";
import useGetPostSaveStatus from "../hooks/useGetPostSaveStatus/useGetPostSaveStatus";
import useComponentVisible from "../hooks/useComponentVisible/useComponentVisible";
import useDeletePost from "../hooks/useDeletePost/useDeletePost";

// TODO: Add timestamp display to post

function Card({ card, setCurrentPage }) {
  const { width } = useWindowSize();
  const [post, setPost] = useState(card);
  const { author, image, comments, likeCount, id } = post;
  const { uid, name } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState("");
  const [likeCountDisplay, setLikeCountDisplay] = useState(likeCount);
  const liked = useGetPostHeartStatus(uid, id);
  const saved = useGetPostSaveStatus(uid, id);
  const [showLikedByModal, setShowLikedByModal] = useState(false);
  const [likedByInfo, setLikedByInfo] = useState(null);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const { deleteStatus, setCommenceDeletion } = useDeletePost(id);

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

  const handleSaveChange = async (e) => {
    e.preventDefault();
    if (saved) {
      await unsavePost(uid, id);
    } else {
      await savePost(uid, id);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (commentInput !== "") {
      await submitComment(id, uid, name, commentInput);
      const post = await updatePost(id);
      setPost(post);
      setCommentInput("");
      document.getElementById("comment-form").reset();
    }
  };

  const handleShowLikedByModal = async () => {
    const info = await getLikedByInfo(id);
    setLikedByInfo(info);
    setShowLikedByModal(true);
  };

  const handleDeletePost = async (e) => {
    e.preventDefault();
    setCommenceDeletion(true);
    // await deletePost(post.id);
  };

  if (!deleteStatus) {
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
            <div
              className="w-7 m-2 relative cursor-pointer"
              ref={ref}
              onClick={() => setIsComponentVisible(true)}
            >
              {post.author.id === uid && <ThreeDots />}
              {isComponentVisible && (
                <div className="absolute -left-20 bg-white border border-gray-300 rounded-md w-28 flex flex-col items-center">
                  <button
                    className="text-red-500 py-3 hover:bg-gray-300 w-full"
                    onClick={(e) => handleDeletePost(e)}
                  >
                    Delete Post
                  </button>
                </div>
              )}
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
                {uid !== author.id && (
                  <Link
                    to={`/messenger/${author.id}`}
                    className="w-8 m-2"
                    onClick={() => setCurrentPage("messenger")}
                  >
                    <PaperAirplane />
                  </Link>
                )}
              </div>
              <div
                className="w-8 m-2 cursor-pointer"
                onClick={(e) => handleSaveChange(e)}
              >
                <Bookmark saved={saved} />
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
            <form
              className="flex p-1 border-t border-gray-200"
              onSubmit={(e) => handleSubmitComment(e)}
              action="#"
              id="comment-form"
            >
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
                type="submit"
              >
                Post
              </button>
            </form>
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
  } else if (deleteStatus) {
    return <div></div>;
  }
}

export default Card;
