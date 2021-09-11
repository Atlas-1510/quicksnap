import React from "react";
import { IconContext } from "react-icons";
import { SiGithub } from "react-icons/si";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex items-center justify-center py-5">
      <Link
        to={{ pathname: "https://github.com/Atlas-1510/quicksnap" }}
        target="_blank"
      >
        <IconContext.Provider value={{ color: "#D1D5DB", size: "3rem" }}>
          <SiGithub />
        </IconContext.Provider>
      </Link>
    </div>
  );
}

export default Footer;
