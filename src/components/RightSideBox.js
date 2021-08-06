import React from "react";

function RightSideBox({ user, followSuggestions }) {
  const { image, userName, fullName } = user;
  return (
    <div className="fixed w-full flex justify-center top-16 invisible lg:visible ">
      <div className="w-2/3 md:max-w-4xl flex justify-end pointer-events-none">
        <div className="text-sm w-1/3 mr-2">
          <div className="flex items-center py-2">
            <img
              src={image}
              alt="User"
              className=" h-14 w-14 border rounded-full"
            />
            <div className="flex flex-col flex-grow ml-3">
              <span className="font-bold">{userName}</span>
              <span className="text-gray-500">{fullName}</span>
            </div>
            <span className="text-blue-500 font-semibold text-sm">Log Out</span>
          </div>
          <div className="flex mt-4 flex-col">
            <span className="text-gray-500 font-semibold">
              Suggestions For You
            </span>
            {followSuggestions &&
              followSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="flex items-center my-2">
                  <img
                    src={suggestion.image}
                    alt="Profile of suggested follow"
                    className=" h-10 w-10 border rounded-full"
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
      </div>
    </div>
  );
}

export default RightSideBox;
