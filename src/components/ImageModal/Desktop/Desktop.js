import React from "react";
import ModalBackground from "../../ModalBackground";
import useComponentVisible from "../../../hooks/useComponentVisible/useComponentVisible";
import ThreeDots from "../../../images/SVG/ThreeDots";
import Heart from "../../../images/SVG/Heart/Heart";
import TextBubble from "../../../images/SVG/TextBubble";
import PaperAirplane from "../../../images/SVG/PaperAirplane/PaperAirplane";
import Bookmark from "../../../images/SVG/Bookmark/Bookmark";

// TODO: Add tests for this component

function Desktop({ post, exit }) {
  const { ref, isComponentVisible } = useComponentVisible(true, exit);
  return (
    <ModalBackground exit={exit}>
      <div ref={ref} className="w-2/3 max-w-4xl">
        {isComponentVisible && (
          <div
            className="grid grid-cols-3 grid-rows-1"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className="col-start-1 col-span-2 min-w-full"
              style={{ maxHeight: "80vh" }}
              data-testid="test-image-modal-desktop"
              src={post.image}
              alt="Full size view of clicked thumbnail"
            />

            <div className="flex flex-col text-sm">
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
              <div className="flex flex-col bg-white text-gray-700 flex-grow">
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
                  <span className="font-bold">{post.likeCount} others</span>
                </span>
                <div className="mx-3 mt-1 mb-3 flex-grow">
                  {post.comments.map((comment) => (
                    <div key={comment.id}>
                      <span className="font-bold ">{comment.author}</span>
                      <span> {comment.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalBackground>
  );
}

export default Desktop;
