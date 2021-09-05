import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../pages/Main";
import submitComment from "../../utils/submitComment/submitComment";
import updatePost from "../../utils/updatePost/updatePost";

import useWindowSize from "../../hooks/useWindowSize/useWindowSize";
import Desktop from "./Desktop/Desktop";
import Mobile from "./Mobile/Mobile";

import useGetPostHeartStatus from "../../hooks/useGetPostHeartStatus/useGetPostHeartStatus";
import likePost from "../../utils/likePost/likePost";
import unlikePost from "../../utils/unlikePost/unlikePost";
import getLikedByInfo from "../../utils/getLikedByInfo/getLikedByInfo";

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
    // invoke getLikedByInfo to get user info of each user in the likedBy array (display photos, name, userName, following status)
    const likedByInfo = await getLikedByInfo(id);
    console.log(likedByInfo);
  };

  if (width > 768) {
    return (
      <Desktop
        post={postInfo}
        exit={exit}
        initCommentSubmit={initCommentSubmit}
        setCommentInput={setCommentInput}
        commentInput={commentInput}
        setHandleLikeChange={setHandleLikeChange}
        liked={liked}
        likeCountDisplay={likeCountDisplay}
        handleShowLikedByModal={handleShowLikedByModal}
      />
    );
  } else {
    return (
      <Mobile
        post={postInfo}
        exit={exit}
        initCommentSubmit={initCommentSubmit}
        setCommentInput={setCommentInput}
        commentInput={commentInput}
        setHandleLikeChange={setHandleLikeChange}
        liked={liked}
        likeCountDisplay={likeCountDisplay}
        handleShowLikedByModal={handleShowLikedByModal}
      />
    );
  }
}

export default ImageModal;
