import React from "react";

import Home from "../images/SVG/Home/Home";
import Search from "../images/SVG/Search";
import Add from "../images/SVG/Add/Add";
import Heart from "../images/SVG/Heart/Heart";
import Profile from "../images/SVG/Profile/Profile";

function BottomMobileNav() {
  return (
    <nav className="fixed flex md:hidden bottom-0 w-full bg-white border-t border-gray-300 items-center justify-between">
      <Home />
      <Search />
      <Add />
      <Heart />
      <Profile />
    </nav>
  );
}

export default BottomMobileNav;
