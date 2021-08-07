import React from "react";

function PaperAirplane({ currentPage }) {
  if (currentPage === "messenger") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 m-2 text-gray-700"
        viewBox="0 0 20 20"
        fill="currentColor"
        stroke="currentColor"
      >
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
      </svg>
    );
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 m-2 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    );
  }
}

export default PaperAirplane;
