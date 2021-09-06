import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModalBackground from "../ModalBackground";
import Add from "../../images/SVG/Add/Add";
import Home from "../../images/SVG/Home/Home";
import PaperAirplane from "../../images/SVG/PaperAirplane/PaperAirplane";
import Profile from "../../images/SVG/Profile/Profile";
import Camera from "../../images/SVG/Camera";
import ImageUploader from "../ImageUploader/ImageUploader";

import testProfile from "../../images/test-images/testUserProfile.png";
import Exit from "../../images/SVG/Exit";
import useIsFirstRender from "../../hooks/useIsFirstRender/useIsFirstRender";

function Header({ currentPage, setCurrentPage }) {
  const [uploadModal, setUploadModal] = useState(false);
  const [recentSearchModal, setRecentSearchModal] = useState(false);
  const [searchResultModal, setSearchResultModal] = useState(false);
  const [searchInput, setSearchInput] = useState(null);
  const isFirstRender = useIsFirstRender();

  const [recentSearches, setRecentSearches] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);

  const showRecentSearches = () => {
    // make a call to get recent searches
    setRecentSearchModal(true);
  };

  const hideSearch = (e) => {
    e.target.value = "";
    setRecentSearchModal(false);
    setSearchResultModal(false);
  };

  useEffect(() => {
    if (!isFirstRender) {
      if (searchInput === "") {
        setRecentSearchModal(true);
      } else {
        setSearchResultModal(true);
      }
    }
  }, [searchInput]);

  useEffect(() => {
    if (recentSearchModal) {
      setSearchResultModal(false);
    }
  }, [recentSearchModal]);

  useEffect(() => {
    if (searchResultModal) {
      setRecentSearchModal(false);
    }
  }, [searchResultModal]);

  return (
    <>
      {/* Mobile Header */}
      <nav className="flex md:hidden justify-between items-center w-full bg-white border-b border-gray-300 py-1">
        <div className="w-7 m-2">
          <Camera />
        </div>
        <h1 className="font-curly text-4xl">QuickSnap</h1>
        <div className="w-7 m-2">
          <PaperAirplane />
        </div>
      </nav>
      {/* Desktop Header */}
      <nav className="hidden md:flex justify-center w-full bg-white border-b border-gray-300 py-1">
        <div className="flex items-center justify-between w-2/3 md:max-w-4xl">
          <Link to="/" onClick={() => setCurrentPage("home")}>
            <h1 className=" font-curly text-4xl">QuickSnap</h1>
          </Link>
          <form>
            <input
              className=" w-4/5 mx-3.5 border border-gray-300 rounded-sm p-1 bg-gray-50 text-center"
              type="text"
              placeholder="Search"
              onFocus={showRecentSearches}
              onBlur={(e) => hideSearch(e)}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
          <div className="flex">
            <Link to="/" onClick={() => setCurrentPage("home")}>
              <div className="w-7 m-2">
                <Home currentPage={currentPage} />
              </div>
            </Link>
            <Link
              to="/messenger"
              onClick={() => setCurrentPage("messenger")}
              data-testid="messenger-icon"
            >
              <div className="w-7 m-2">
                <PaperAirplane currentPage={currentPage} />
              </div>
            </Link>
            <div
              className="w-7 m-2 cursor-pointer"
              data-testid="add-icon"
              onClick={() => setUploadModal(true)}
            >
              <Add currentPage={currentPage} />
            </div>
            <Link
              to="/user"
              onClick={() => setCurrentPage("profile")}
              data-testid="profile-icon"
            >
              <div className="w-7 m-2">
                <Profile currentPage={currentPage} />
              </div>
            </Link>
          </div>
        </div>
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
      {/* Search modal */}
      {recentSearchModal && (
        <RecentSearchModal recentSearches={recentSearches} />
      )}
      {searchResultModal && <SearchModal searchResults={recentSearches} />}
    </>
  );
}

export default Header;

function RecentSearchModal({ recentSearches }) {
  return (
    <div className="absolute left-96 top-14 flex flex-col items-center">
      <div className="w-4 h-4 transform rotate-45 bg-white absolute -top-2 shadow-lg z-40"></div>
      <div className="w-96 h-96 bg-white z-50 flex flex-col items-center shadow-xl border-0 rounded-md p-3">
        <div className="flex justify-between w-full">
          <span className="font-semibold text-lg">Recent</span>
          <span className="font-semibold text-sm text-blue-500 cursor-pointer">
            Clear All
          </span>
        </div>
        <div className="w-full overflow-y-scroll">
          {/*  */}
          {recentSearches.map((index) => {
            return (
              <div className="flex my-2 items-center w-full justify-between">
                <img
                  alt="User"
                  src={testProfile}
                  className="h-10 w-10 border rounded-full"
                />
                <div className="flex flex-col flex-grow ml-3">
                  <span className="font-semibold text-sm">iamjasona</span>
                  <span className="text-gray-500 text-xs">Jason Aravanis</span>
                </div>
                <div className="w-7 m-2">
                  <Exit />
                </div>
              </div>
            );
          })}

          {/*  */}
        </div>
      </div>
    </div>
  );
}

function SearchModal({ searchResults }) {
  return (
    <div className="absolute left-96 top-14 flex flex-col items-center">
      <div className="w-4 h-4 transform rotate-45 bg-white absolute -top-2 shadow-lg z-40"></div>
      <div className="w-96 h-96 bg-white z-50 flex flex-col items-center shadow-xl border-0 rounded-md p-3 overflow-y-scroll">
        {searchResults.map((index) => {
          return (
            <div className="flex my-1 items-center w-full justify-between">
              <img
                alt="User"
                src={testProfile}
                className="h-10 w-10 border rounded-full"
              />
              <div className="flex flex-col flex-grow ml-3">
                <span className="font-semibold text-sm">iamjasona</span>
                <span className="text-gray-500 text-xs">Jason Aravanis</span>
              </div>
              <div className="w-7 m-2">
                <Exit />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
