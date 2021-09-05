import React from "react";

import Home from "../images/SVG/Home/Home";
import Search from "../images/SVG/Search";
import Add from "../images/SVG/Add/Add";
import Profile from "../images/SVG/Profile/Profile";

function BottomMobileNav() {
  return (
    <nav className="flex md:hidden w-full bg-white border-t border-gray-300 items-center justify-between">
      <div className="w-8 m-2">
        <Home />
      </div>
      <div className="w-8 m-2">
        <Search />
      </div>
      <div className="w-8 m-2">
        <Add />
      </div>
      <div className="w-8 m-2">
        <Profile />
      </div>
    </nav>
  );
}

export default BottomMobileNav;
