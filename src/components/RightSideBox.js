import React from "react";
import handleLogOut from "../utils/handleLogOut/handleLogOut";
import { Link } from "react-router-dom";

function RightSideBox({ user, followSuggestions, setCurrentPage }) {
  const { profileImage, name, fullName } = user;

  return (
    <div className="fixed w-screen flex justify-center top-16 left-0 invisible lg:visible pointer-events-none">
      <div className="w-2/3 md:max-w-4xl flex justify-end z-50">
        <div className="text-sm w-1/3 mr-2 pointer-events-auto">
          <div className="flex items-center justify-between py-2">
            <Link to={`/user`} onClick={() => setCurrentPage("profile")}>
              <div className="flex items-center">
                <img
                  src={profileImage}
                  alt="User"
                  className=" h-14 w-14 border rounded-full"
                />
                <div className="flex flex-col flex-grow ml-3">
                  <span className="font-bold">{name}</span>
                  <span className="text-gray-500">{fullName}</span>
                </div>
              </div>
            </Link>

            <span
              className="text-blue-500 font-semibold text-sm cursor-pointer "
              onClick={handleLogOut}
            >
              Log Out
            </span>
          </div>
          <div className="flex mt-4 flex-col">
            <span className="text-gray-500 font-semibold">
              Suggestions For You
            </span>
            {followSuggestions &&
              followSuggestions.map((suggestion) => (
                <Link to={`/view-user/${suggestion.id}`} key={suggestion.id}>
                  <div className="flex items-center my-2">
                    <img
                      src={suggestion.profileImage}
                      alt="Profile of suggested follow"
                      className=" h-10 w-10 border rounded-full"
                    />
                    <span className="font-bold flex-grow ml-3">
                      {suggestion.name}
                    </span>
                    <span className="text-blue-500 font-semibold text-sm">
                      View
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSideBox;
