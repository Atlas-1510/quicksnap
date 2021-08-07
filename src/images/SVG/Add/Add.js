import React from "react";

function Filled() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      title="add"
      data-testid="icon-add"
      className="h-7 w-7 m-2 text-gray-700 fill-current"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Outline() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      title="add"
      data-testid="icon-add"
      className="h-7 w-7 m-2 text-gray-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function Add({ currentPage }) {
  return (
    <>
      {currentPage === "add" && <Filled />}
      {currentPage !== "add" && <Outline />}
    </>
  );
}

export default Add;
