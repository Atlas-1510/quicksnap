import React from "react";

function Button({ children }) {
  return (
    <button className="bg-blue-500 my-3 py-1 px-2 border-0 rounded-sm text-white hover:shadow-inner hover:bg-blue-400">
      {children}
    </button>
  );
}

export default Button;
