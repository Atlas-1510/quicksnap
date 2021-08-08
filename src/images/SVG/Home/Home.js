import React from "react";

function Filled() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      title="home"
      data-testid="icon-home"
      className="w-full text-gray-700 fill-current"
      viewBox="0 0 20 20"
      stroke="currentColor"
    >
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  );
}

function Outline() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      title="home"
      data-testid="icon-home"
      className=" text-gray-700 w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

function House({ currentPage }) {
  return (
    <>
      {currentPage === "home" && <Filled />}
      {currentPage !== "home" && <Outline />}
    </>
  );
}

export default House;
