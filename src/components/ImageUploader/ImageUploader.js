import React from "react";

import Exit from "../../images/SVG/Exit";
import Button from "../Button";
import Media from "../../images/SVG/Media";

function ImageUploader({ exit }) {
  return (
    <div className="h-full flex flex-col">
      <div className="relative border-b border-gray-300 flex items-center justify-center py-2">
        <span className="font-semibold text-sm">New Post</span>
        <div className="mx-2 w-7 absolute right-0" onClick={() => exit()}>
          <Exit />
        </div>
      </div>
      <div className="flex flex-col h-full justify-center items-center">
        <div className="mx-2 w-20">
          <Media />
        </div>
        <span className="mt-3 mb-2">Drag photos and videos here.</span>
        <Button>Select From Computer</Button>
      </div>
    </div>
  );
}

export default ImageUploader;
