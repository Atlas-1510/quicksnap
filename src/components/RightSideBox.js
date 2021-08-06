import React from "react";

function RightSideBox({ user, followSuggestions }) {
  const { image, userName, fullName } = user;
  return (
    <div className="col-start-7 col-span-3 mx-7 mt-7 pr-16">
      <div className="flex items-center">
        <img
          src={image}
          alt="User"
          className=" h-20 w-20 border rounded-full"
        />
        <div className="flex flex-col flex-grow ml-3">
          <span className="font-bold">{userName}</span>
          <span className="text-gray-500">{fullName}</span>
        </div>
        <span className="text-blue-500 font-semibold text-sm">Log Out</span>
      </div>
      <div className="flex mt-4 flex-col">
        <span className="text-gray-500 font-semibold">Suggestions For You</span>
        {followSuggestions &&
          followSuggestions.map((suggestion) => (
            <div className="flex items-center my-2">
              <img
                src={suggestion.image}
                alt="Profile of suggested follow"
                className=" h-12 w-12 border rounded-full"
              />
              <span className="font-bold flex-grow ml-3">
                {suggestion.userName}
              </span>
              <span className="text-blue-500 font-semibold text-sm">
                Follow
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RightSideBox;
