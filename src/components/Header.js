import React from "react";
import Add from "../images/SVG/Add";
import Eye from "../images/SVG/Eye";
import Heart from "../images/SVG/Heart";
import House from "../images/SVG/House";
import PaperAirplane from "../images/SVG/PaperAirplane";
import User from "../images/SVG/User";

function Header() {
  return (
    <header className="grid grid-cols-11 border-b border-gray-300 items-center p-2">
      <h1 className="col-start-3 font-curly text-4xl">QuickSnap</h1>
      <form className="col-start-5 col-span-3 flex justify-center items-center">
        <input
          className=" w-1/2 border border-gray-300 rounded-sm p-1 bg-gray-50 text-center"
          type="text"
          placeholder="Search"
        />
      </form>
      <div className="col-start-8 col-span-2 flex">
        <House />
        <PaperAirplane />
        <Add />
        <Heart />
        <Eye />
        <User />
      </div>
    </header>
  );
}

export default Header;
