import React from "react";
import Add from "../images/SVG/Add";
import Eye from "../images/SVG/Eye";
import Heart from "../images/SVG/Heart";
import House from "../images/SVG/House";
import PaperAirplane from "../images/SVG/PaperAirplane";
import User from "../images/SVG/User";
import Camera from "../images/SVG/Camera";

function Header() {
  return (
    <>
      {/* Mobile Header */}
      <nav className="flex md:hidden justify-between items-center w-full bg-white border-b border-gray-300 py-1 fixed top-0">
        <Camera />
        <h1 className="font-curly text-4xl">QuickSnap</h1>
        <PaperAirplane />
      </nav>
      {/* Desktop Header */}
      <nav className="hidden md:flex justify-center w-full bg-white border-b border-gray-300 py-1 fixed top-0">
        <div className="flex items-center justify-between w-2/3 md:max-w-4xl">
          <h1 className="font-curly text-4xl">QuickSnap</h1>
          <form>
            <input
              className=" w-4/5 mx-3.5 border border-gray-300 rounded-sm p-1 bg-gray-50 text-center"
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
    </>
  );
}

export default Header;
