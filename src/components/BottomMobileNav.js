import React from "react";

import House from "../images/SVG/House";
import Search from "../images/SVG/Search";
import Add from "../images/SVG/Add";
import Heart from "../images/SVG/Heart";
import User from "../images/SVG/User";

function BottomMobileNav() {
  return (
    <nav className="fixed flex md:hidden bottom-0 w-full bg-white border-t border-gray-300 items-center justify-between">
      <House />
      <Search />
      <Add />
      <Heart />
      <User />
    </nav>
  );
}

export default BottomMobileNav;
