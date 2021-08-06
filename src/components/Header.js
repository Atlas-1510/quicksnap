import React from "react";
import Add from "../images/SVG/Add";
import Eye from "../images/SVG/Eye";
import Heart from "../images/SVG/Heart";
import House from "../images/SVG/House";
import PaperAirplane from "../images/SVG/PaperAirplane";
import User from "../images/SVG/User";

function Header() {
  return (
    <nav className="flex justify-center w-full bg-white border-b border-gray-300 py-1 fixed">
      <div className="flex items-center justify-between w-2/3 md:max-w-4xl">
        <h1 className="font-curly text-4xl">QuickSnap</h1>
        <form>
          <input
            className="w-full ml-3.5 border border-gray-300 rounded-sm p-1 bg-gray-50 text-center"
            type="text"
            placeholder="Search"
          />
        </form>
        <div className="flex">
          <House />
          <PaperAirplane />
          <Add />
          <Heart />
          <Eye />
          <User />
        </div>
      </div>
    </nav>
  );
}

export default Header;
