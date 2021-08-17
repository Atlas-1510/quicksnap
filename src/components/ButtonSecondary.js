import React from "react";

function ButtonSecondary({ children }) {
  return (
    <button className="bg-gray-400 my-3 py-1 px-2 border-0 rounded-sm text-white hover:shadow-inner hover:bg-gray-300">
      {children}
    </button>
  );
}

export default ButtonSecondary;
