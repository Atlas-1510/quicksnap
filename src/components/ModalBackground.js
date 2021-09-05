import React from "react";

function ModalBackground({ children, exit }) {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen">
      <div className=" bg-black opacity-50 w-full h-full" />
      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full h-full">
        <div
          className="flex justify-center items-center w-full h-full"
          onClick={() => exit()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalBackground;
