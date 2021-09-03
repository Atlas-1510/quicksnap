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

function ImageModal({ post, setActivePost }) {
  const { width } = useWindowSize();
  const [postInfo, setPostInfo] = useState(post);
  const { id } = postInfo;
  const { uid, name } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState("");
  const [handleChange, setHandleChange] = useState(false);

  useEffect(() => {
    if (handleChange) {
      (async () => {
        await submitComment(id, uid, name, commentInput);
        const post = await updatePost(id);
        setPostInfo(post);
        setCommentInput("");
      })();
    }
    setHandleChange(false);
  }, [handleChange]);

  const initCommentSubmit = (e) => {
    e.preventDefault();
    setHandleChange(true);
  };

  const exit = () => {
    setActivePost(null);
  };

  const liked = useGetPostHeartStatus(uid, id);

  const handleHeartClick = async () => {
    if (liked) {
      await unlikePost(uid, id);
    } else {
      await likePost(uid, id);
    }
  };

  if (width > 768) {
    return (
      <Desktop
        post={postInfo}
        exit={exit}
        initCommentSubmit={initCommentSubmit}
        setCommentInput={setCommentInput}
        commentInput={commentInput}
        handleHeartClick={handleHeartClick}
        liked={liked}
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
        handleHeartClick={handleHeartClick}
        liked={liked}
      />
    );
  }
}

export default ImageModal;
