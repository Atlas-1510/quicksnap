import React from "react";

import useWindowSize from "../../hooks/useWindowSize/useWindowSize";
import Desktop from "./Desktop/Desktop";
import Mobile from "./Mobile/Mobile";

function ImageModal({ post, setActivePost }) {
  const { width } = useWindowSize();

  const exit = () => {
    setActivePost(null);
  };

  if (width > 768) {
    return <Desktop post={post} exit={exit} />;
  } else {
    return <Mobile post={post} exit={exit} />;
  }
}

export default ImageModal;
