import React, { useState, useEffect, useContext } from "react";
import testProfile from "../../../images/test-images/testUserProfile.png";
import Exit from "../../../images/SVG/Exit";
import { UserContext } from "../../../pages/Main";
import getUserInfo from "../../../utils/getUserInfo/getUserInfo";
import useComponentVisible from "../../../hooks/useComponentVisible/useComponentVisible";
import { Link } from "react-router-dom";

function Search() {
  const [searchModal, setSearchModal] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const { searches } = useContext(UserContext);
  const [recentlyViewed, setRecentlyViewed] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const updateSearch = (e) => {
    setSearchInput(e.target.value);
    const testSearchResults = [
      {
        name: "test1",
        fullName: "Test One",
        profileImage: testProfile,
        id: "test1",
      },
      {
        name: "test2",
        fullName: "Test Two",
        profileImage: testProfile,
        id: "test2",
      },
    ];
    setSearchResults(testSearchResults);

    // make a query across firestore to get all users that have a name or username that matches the search input
    // need to use algolia, because firestore doesn't support search for text fields. Would only find an exact match, which defeats
    // the point of searching for a user.
    // limit results to 10. paginate.
    // save search results in a new state variable (like recentlyViewed but for new search), which is then used by SearchModal
  };

  useEffect(() => {
    if (searchModal === "recent") {
      (async () => {
        // Make this a real time listener to updates in the user doc --> searches array
        const promises = [];
        searches.forEach((userID) => {
          const promise = getUserInfo(userID);
          promises.push(promise);
        });
        const users = await Promise.all(promises);
        setRecentlyViewed(users);
      })();
    }
  }, [searchModal]);

  useEffect(() => {
    if (isComponentVisible && searchInput === "") {
      setSearchModal("recent");
    } else if (isComponentVisible && searchInput !== "") {
      setSearchModal("search");
    }
  }, [searchInput]);

  useEffect(() => {
    if (isComponentVisible) {
      if (searchInput === "") {
        setSearchModal("recent");
      } else {
        setSearchModal("search");
      }
    } else {
      setSearchModal(null);
    }
  }, [isComponentVisible]);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className=" w-4/5 mx-3.5 border border-gray-300 rounded-sm p-1 bg-gray-50 text-center"
          type="text"
          placeholder="Search"
          onClick={() => setIsComponentVisible(true)}
          onChange={(e) => updateSearch(e)}
        />
      </form>
      <div className="absolute top-14" ref={ref} style={{ left: "35%" }}>
        {isComponentVisible && (
          <div className="flex flex-col items-center">
            {searchModal === "recent" && (
              <>
                <div className="w-4 h-4 transform rotate-45 bg-white absolute -top-2 shadow-lg z-40"></div>
                <RecentSearchModal
                  recentlyViewed={recentlyViewed}
                  setIsComponentVisible={setIsComponentVisible}
                />
              </>
            )}
            {searchModal === "search" && searchResults && (
              <>
                <div className="w-4 h-4 transform rotate-45 bg-white absolute -top-2 shadow-lg z-40"></div>
                <SearchModal searchResults={searchResults} />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Search;

function RecentSearchModal({ recentlyViewed, setIsComponentVisible }) {
  return (
    <div className="w-96 h-96 bg-white z-50 flex flex-col items-center shadow-xl border-0 rounded-md p-3">
      <div className="flex justify-between w-full">
        <span className="font-semibold text-lg">Recent</span>
        <span className="font-semibold text-sm text-blue-500 cursor-pointer">
          Clear All
        </span>
      </div>
      <div className="w-full overflow-y-scroll">
        {recentlyViewed &&
          recentlyViewed.map((user) => {
            return (
              <Link
                to={`/view-user/${user.id}`}
                onClick={() => setIsComponentVisible(false)}
                key={user.id}
              >
                <div className="flex my-2 items-center w-full justify-between">
                  <img
                    alt="User"
                    src={user.profileImage}
                    className="h-10 w-10 border rounded-full"
                  />
                  <div className="flex flex-col flex-grow ml-3">
                    <span className="font-semibold text-sm">{user.name}</span>
                    <span className="text-gray-500 text-xs">
                      {user.fullName}
                    </span>
                  </div>
                  <div className="w-7 m-2">
                    <Exit />
                  </div>
                </div>
              </Link>
            );
          })}
        {recentlyViewed === null && <div>No recent searches</div>}
      </div>
    </div>
  );
}

function SearchModal({ searchResults }) {
  return (
    <div className="w-96 h-96 bg-white z-50 flex flex-col items-center shadow-xl border-0 rounded-md p-3 overflow-y-scroll">
      <div className="w-full overflow-y-scroll">
        {searchResults.map((user) => {
          return (
            <Link to={`/view-user/${user.id}`} key={user.id}>
              <div className="flex my-1 items-center w-full justify-between">
                <img
                  alt="User"
                  src={user.profileImage}
                  className="h-10 w-10 border rounded-full"
                />
                <div className="flex flex-col flex-grow ml-3">
                  <span className="font-semibold text-sm">{user.name}</span>
                  <span className="text-gray-500 text-xs">{user.fullName}</span>
                </div>
                <div className="w-7 m-2">
                  <Exit />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
