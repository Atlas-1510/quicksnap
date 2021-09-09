import React, { useState, useContext } from "react";
import { UserContext } from "../../pages/Main";
import submitComment from "../../utils/submitComment/submitComment";
import updatePost from "../../utils/updatePost/updatePost";
import useWindowSize from "../../hooks/useWindowSize/useWindowSize";
import useGetPostHeartStatus from "../../hooks/useGetPostHeartStatus/useGetPostHeartStatus";
import likePost from "../../utils/likePost/likePost";
import unlikePost from "../../utils/unlikePost/unlikePost";
import getLikedByInfo from "../../utils/getLikedByInfo/getLikedByInfo";
import ModalBackground from "../ModalBackground";
import ThreeDots from "../../images/SVG/ThreeDots";
import Heart from "../../images/SVG/Heart/Heart";
import PaperAirplane from "../../images/SVG/PaperAirplane/PaperAirplane";
import Bookmark from "../../images/SVG/Bookmark/Bookmark";
import ChevronLeft from "../../images/SVG/ChevronLeft";
import LikedByModal from "../LikedByModal/LikedByModal";

function ImageModal({ post, setActivePost }) {
  const { width } = useWindowSize();
  const [postInfo, setPostInfo] = useState(post);
  const { id, likeCount } = postInfo;
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
      setPostInfo(post);
      setCommentInput("");
    }
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
                  <div className="mx-3 mt-1 mb-3 flex-grow h-full overflow-y-scroll">
                    {postInfo.comments.map((comment) => (
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
                      onClick={(e) => handleSubmitComment(e)}
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
