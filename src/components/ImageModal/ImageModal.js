import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../pages/Main";
import submitComment from "../../utils/submitComment/submitComment";
import updatePost from "../../utils/updatePost/updatePost";

import useWindowSize from "../../hooks/useWindowSize/useWindowSize";

import useGetPostHeartStatus from "../../hooks/useGetPostHeartStatus/useGetPostHeartStatus";
import likePost from "../../utils/likePost/likePost";
import unlikePost from "../../utils/unlikePost/unlikePost";
import getLikedByInfo from "../../utils/getLikedByInfo/getLikedByInfo";

// ********

import ModalBackground from "../ModalBackground";
import useComponentVisible from "../../hooks/useComponentVisible/useComponentVisible";
import ThreeDots from "../../images/SVG/ThreeDots";
import Heart from "../../images/SVG/Heart/Heart";
import PaperAirplane from "../../images/SVG/PaperAirplane/PaperAirplane";
import Bookmark from "../../images/SVG/Bookmark/Bookmark";
import ChevronLeft from "../../images/SVG/ChevronLeft";
import Button from "../Button";
import followUser from "../../utils/followUser/followUser";
import unfollowUser from "../../utils/unfollowUser/unfollowUser";

// ********

function ImageModal({ post, setActivePost }) {
  const { width } = useWindowSize();
  const [postInfo, setPostInfo] = useState(post);
  const { id, likeCount } = postInfo;
  const { uid, name } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState("");
  const [handleNewComment, setHandleNewComment] = useState(false);
  const [handleLikeChange, setHandleLikeChange] = useState(false);
  const [likeCountDisplay, setLikeCountDisplay] = useState(likeCount);
  const liked = useGetPostHeartStatus(uid, id);
  const [showLikedByModal, setShowLikedByModal] = useState(false);
  const [likedByInfo, setLikedByInfo] = useState(null);

  useEffect(() => {
    if (handleNewComment) {
      (async () => {
        await submitComment(id, uid, name, commentInput);
        const post = await updatePost(id);
        setPostInfo(post);
        setCommentInput("");
      })();
    }
    setHandleNewComment(false);
  }, [handleNewComment]);

  useEffect(() => {
    if (handleLikeChange) {
      (async () => {
        if (liked) {
          await unlikePost(uid, id);
          setLikeCountDisplay(likeCountDisplay - 1);
        } else {
          await likePost(uid, id);
          const info = await getLikedByInfo(id);
          setLikedByInfo(info);
          setLikeCountDisplay(likeCountDisplay + 1);
        }
      })();
    }
    setHandleLikeChange(false);
  }, [handleLikeChange]);

  const initCommentSubmit = (e) => {
    e.preventDefault();
    setHandleNewComment(true);
  };

  const exit = () => {
    setActivePost(null);
  };

  const handleShowLikedByModal = async () => {
    const info = await getLikedByInfo(id);
    setLikedByInfo(info);
    setShowLikedByModal(true);
  };

  return (
    <>
      <ModalBackground exit={exit}>
        <div
          className={
            width > 768
              ? "w-2/3 max-w-4xl"
              : "bg-white absolute top-0 w-full h-full flex flex-col"
          }
        >
          <>
            {width < 768 && (
              <div className="relative border-b border-gray-300 flex items-center justify-center py-2">
                <div
                  className="absolute left-0 mx-2 w-7"
                  onClick={() => exit()}
                >
                  <ChevronLeft />
                </div>
                <div className="m-1 flex items-center">
                  <img
                    className="w-8 h-8 md:border rounded-full"
                    src={post.author.profileImage}
                    alt="Author profile"
                  />
                  <span className="mx-3">{post.author.name}</span>
                </div>
              </div>
            )}
            <div
              className={
                width > 768
                  ? "grid grid-cols-3 grid-rows-1"
                  : "flex flex-col text-sm h-full flex-grow"
              }
              onClick={(e) => e.stopPropagation()}
            >
              <img
                className="col-start-1 col-span-2 min-w-full"
                style={{ maxHeight: "80vh" }}
                data-testid="test-image-modal-desktop"
                src={post.image}
                alt="Full size view of clicked thumbnail"
              />
              <div className="flex flex-col text-sm flex-grow">
                <div className="flex justify-between bg-white h-12 items-center">
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
                <div className="flex flex-col bg-white text-gray-700 h-full flex-grow">
                  <div className="flex justify-between">
                    <div className="flex">
                      <div
                        className="w-8 m-2 cursor-pointer"
                        onClick={setHandleLikeChange}
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
                        <span className="font-bold">
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
                  <div className="mx-3 mt-1 mb-3 flex-grow h-full overflow-y-scroll">
                    {post.comments.map((comment) => (
                      <div key={comment.id}>
                        <span className="font-bold">{comment.author.name}</span>
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
          </>
        </div>
      </ModalBackground>
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

export default ImageModal;

function LikedByModal({ width, likedByInfo, exit }) {
  const { ref, isComponentVisible } = useComponentVisible(true, exit);
  const { following } = useContext(UserContext);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full grid place-items-center bg-black bg-opacity-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={ref}
        className={
          width > 768
            ? "w-1/3 bg-white border rounded-md z-50"
            : "bg-white absolute top-0 w-full h-full z-50"
        }
      >
        {isComponentVisible && (
          <div className={width > 768 ? "" : "flex flex-col text-sm"}>
            <div className="flex flex-col text-sm">
              <div className="border-b border-gray-300 flex items-center justify-center py-2 relative">
                <div className=" absolute left-0 w-7" onClick={(e) => exit(e)}>
                  <ChevronLeft />
                </div>
                <span className="font-semibold m-1">Likes</span>
              </div>
              {likedByInfo &&
                likedByInfo.map((user) => (
                  <LikedByUser user={user} following={following} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LikedByUser({ user, following }) {
  const [isFollowing, setIsFollowing] = useState(null);
  const { uid } = useContext(UserContext);
  useEffect(() => {
    if (following.includes(user.id)) {
      if (user.id === uid) {
        setIsFollowing("current_user");
      } else {
        setIsFollowing(true);
      }
    } else {
      setIsFollowing(false);
    }
  }, []);

  const handleFollowUser = async (e) => {
    e.preventDefault();
    await followUser(uid, user.id);
    setIsFollowing(true);
  };

  const handleUnfollowUser = async (e) => {
    e.preventDefault();
    await unfollowUser(uid, user.id);
    setIsFollowing(false);
  };

  return (
    <div className="flex m-2 items-center">
      <img
        alt="User"
        src={user.profileImage}
        className="h-10 w-10 border rounded-full"
      />
      <div className="flex flex-col flex-grow ml-3">
        <span className="font-semibold">{user.name}</span>
        <span className="text-gray-500">{user.fullName}</span>
      </div>
      {isFollowing && isFollowing !== "current_user" && (
        <button
          onClick={(e) => handleUnfollowUser(e)}
          className="border border-gray-300 rounded-md py-1 px-2 mr-2 md:m-1 text-sm font-semibold hover:bg-gray-300 hover:shadow-inner"
        >
          Following
        </button>
      )}
      {!isFollowing && (
        <div className="mx-1" onClick={handleFollowUser}>
          <Button>Follow</Button>
        </div>
      )}
    </div>
  );
}
