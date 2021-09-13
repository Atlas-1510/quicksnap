import React, { useState } from "react";
import Home from "../images/SVG/Home/Home";
import Add from "../images/SVG/Add/Add";
import Profile from "../images/SVG/Profile/Profile";
import { Link } from "react-router-dom";
import PaperAirplane from "../images/SVG/PaperAirplane/PaperAirplane";
import ImageUploader from "./ImageUploader/ImageUploader";
import ModalBackground from "./ModalBackground";
import MagnifyingGlass from "../images/SVG/MagnifyingGlass";

function BottomMobileNav({ currentPage, setCurrentPage }) {
  const [uploadModal, setUploadModal] = useState(false);
  return (
    <>
      <nav className=" flex md:hidden w-full bg-white border-t border-gray-300 items-center justify-between">
        <Link to="/" onClick={() => setCurrentPage("home")}>
          <div className="w-8 m-2">
            <Home currentPage={currentPage} />
          </div>
        </Link>
        <Link to="/messenger" onClick={() => setCurrentPage("messenger")}>
          <div className="w-8 m-2">
            <PaperAirplane currentPage={currentPage} />
          </div>
        </Link>
        <Link to="/search" onClick={() => setCurrentPage("search")}>
          <div className="w-7 m-2">
            <MagnifyingGlass currentPage={currentPage} />
          </div>
        </Link>
        <div className="w-8 m-2" onClick={() => setUploadModal(true)}>
          <Add currentPage={currentPage} />
        </div>

        <Link to="/user" onClick={() => setCurrentPage("profile")}>
          <div className="w-8 m-2">
            <Profile currentPage={currentPage} />
          </div>
        </Link>
      </nav>
      {uploadModal && (
        <ModalBackground exit={() => setUploadModal(false)}>
          <ImageUploader
            exit={() => setUploadModal(false)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </ModalBackground>
      )}
    </>
  );
}

export default BottomMobileNav;
