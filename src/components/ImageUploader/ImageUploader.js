import React, { useState, useEffect, useContext } from "react";
import Exit from "../../images/SVG/Exit";
import Button from "../Button";
import ButtonSecondary from "../ButtonSecondary";
import Media from "../../images/SVG/Media";
import useComponentVisible from "../../hooks/useComponentVisible/useComponentVisible";
import useIsFirstRender from "../../hooks/useIsFirstRender/useIsFirstRender";
import postImage from "./postImage/postImage";
import { UserContext } from "../../pages/Main";
import compressImage from "./compressImage/compressImage";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FeedContext } from "../../pages/Main";

function ImageUploader({ exit, currentPage, setCurrentPage }) {
  const user = useContext(UserContext);
  const isFirstRender = useIsFirstRender();
  const [returnRef] = useState(currentPage);
  const [image, setImage] = useState(null);
  const [view, setView] = useState("no-image");
  const { updateFeed } = useContext(FeedContext);

  const [submissionComplete, setSubmissionComplete] = useState(false);

  const handleExit = () => {
    setCurrentPage(returnRef);
    exit();
  };

  const { ref, isComponentVisible } = useComponentVisible(true, handleExit);

  useEffect(() => {
    setCurrentPage("add");
  }, [setCurrentPage]);

  const handleButtonClick = () => {
    document.querySelector("#file-input").click();
  };

  const handleImageSelection = () => {
    const chosenImage = document.querySelector("#file-input").files[0];
    setImage(chosenImage);
    setView("image-chosen");
  };

  const handleSubmission = async () => {
    setView("pending-upload");
    if (!/image/i.test(image.type)) {
      alert("File " + image.name + " is not an image.");
      setImage(null);
      setView("no-image");
      return false;
    }
    let fileToUpload = image.size > 102400 ? await compressImage(image) : image;
    const result = await postImage(user, fileToUpload);
    if (result === "success") {
      setView("image-uploaded");
      setTimeout(() => {
        setSubmissionComplete(true);
      }, 1500);
      // instead of refreshing whole app, call a parent method to refresh feed state
      // window.location.reload();
      updateFeed();
    } else {
      setView("upload-failure");
      console.log("Recieved an error when trying to post image");
      setTimeout(() => {
        setSubmissionComplete(true);
      }, 3000);
    }
  };

  useEffect(() => {
    if (!isFirstRender && submissionComplete) {
      handleExit();
    }
  });

  function dragOverHandler(ev) {
    ev.preventDefault();
  }

  const dropHandler = (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === "file") {
          const file = e.dataTransfer.items[i].getAsFile();
          setImage(file);
        }
      }
    }
    removeDragData(e);
  };

  function removeDragData(ev) {
    if (ev.dataTransfer.items) {
      ev.dataTransfer.items.clear();
    } else {
      ev.dataTransfer.clearData();
    }
  }

  return (
    <div ref={ref} className="w-11/12 h-3/4 md:w-1/2 md:h-1/2">
      {isComponentVisible && (
        <div
          className="bg-white border rounded-md border-gray-300 w-full h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full flex flex-col">
            <div className="relative border-b border-gray-300 flex items-center justify-center py-2">
              <span className="font-semibold text-sm">New Post</span>
              <div
                className="mx-2 w-7 absolute right-0 cursor-pointer"
                onClick={() => handleExit()}
              >
                <Exit />
              </div>
            </div>
            {view === "no-image" && (
              <div className="flex flex-col h-full justify-center items-center">
                <div
                  className="flex flex-col justify-center items-center"
                  id="drop-zone"
                  onDrop={(e) => dropHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                >
                  <div className="mx-2 w-20">
                    <Media />
                  </div>
                  <span className="mt-3 mb-2 invisible md:visible">
                    Drag a photo here.
                  </span>
                  <div
                    id="file-upload-button"
                    onClick={() => handleButtonClick()}
                    data-testid="test-file-upload-button"
                  >
                    <Button>Select From Computer</Button>
                  </div>
                </div>
              </div>
            )}
            {view === "image-chosen" && (
              <div className="flex flex-col h-full justify-center items-center">
                <div
                  className="w-1/3 flex items-center justify-center"
                  data-testid="test-image-preview"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    id="chosen-image"
                  />
                </div>
                <div className="flex">
                  <div className="m-2" onClick={() => handleButtonClick()}>
                    <ButtonSecondary>Change Image</ButtonSecondary>
                  </div>
                  <div className="m-2" onClick={() => handleSubmission()}>
                    <Button>Share</Button>
                  </div>
                </div>
              </div>
            )}
            {view === "pending-upload" && (
              <div className="flex flex-col h-full justify-center items-center">
                <Loader
                  type="Grid"
                  color="#D1D5DB"
                  height={50}
                  width={50}
                  timeout={3000}
                />
              </div>
            )}
            {view === "image-uploaded" && (
              <div className="flex flex-col h-full justify-center items-center">
                <span className="text-gray-500">
                  Your post has been uploaded!
                </span>
              </div>
            )}
            {view === "upload-failure" && (
              <div className="flex flex-col h-full justify-center items-center">
                <span className="text-gray-500">
                  Sorry, something went wrong while uploading your post.
                </span>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              id="file-input"
              onChange={() => handleImageSelection()}
              data-testid="test-file-input"
            ></input>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
