import React, { useState, useEffect, useContext } from "react";
import Exit from "../../../images/SVG/Exit";
import { UserContext } from "../../../pages/Main";
import getUserInfo from "../../../utils/getUserInfo/getUserInfo";
import { Link } from "react-router-dom";
import algoliasearch from "algoliasearch/lite";
import { firestore, FieldValue } from "../../../firebase/firebase";
import ChevronLeft from "../../../images/SVG/ChevronLeft";

const searchClient = algoliasearch(
  "JB4UGTXL86",
  "376e4fa2201e0406edaba9dd56057475"
);
const index = searchClient.initIndex("quicksnap_users");

function MobileSearch({ setCurrentPage }) {
  const [searchModal, setSearchModal] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const { uid } = useContext(UserContext);
  const [recentlyViewedUsers, setRecentlyViewedUsers] = useState([]);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const unsub = firestore
      .collection("users")
      .doc(uid)
      .onSnapshot((snap) => {
        const unpacked = snap.data();
        setPreviousSearches(unpacked.searches);
      });

    return () => {
      unsub();
    };
    // Note: uid will never change (represents the id of the currently logged in user)
    // Have added here to remove warning in console about missing dependency.
  }, [uid]);

  const updateSearch = async (e) => {
    setSearchInput(e.target.value);
    const { hits } = await index.search(searchInput);
    const filteredHits = hits.filter((hit) => hit.id !== uid);
    setSearchResults(filteredHits);
  };

  const storeSearch = async (id) => {
    const userRef = firestore.collection("users").doc(uid);
    await userRef.update({
      searches: FieldValue.arrayUnion(id),
    });
  };

  const deleteSearchHistory = async () => {
    const userRef = firestore.collection("users").doc(uid);
    await userRef.update({
      searches: [],
    });
  };

  const deleteSingleSearch = async (id) => {
    const userRef = firestore.collection("users").doc(uid);
    await userRef.update({
      searches: FieldValue.arrayRemove(id),
    });
  };

  useEffect(() => {
    (async () => {
      const promises = [];
      previousSearches.forEach((userID) => {
        const promise = getUserInfo(userID);
        promises.push(promise);
      });
      const users = await Promise.all(promises);
      setRecentlyViewedUsers(users);
    })();
  }, [previousSearches]);

  useEffect(() => {
    if (searchInput === "") {
      setSearchModal("recent");
    } else if (searchInput !== "") {
      setSearchModal("search");
    }
  }, [searchInput]);

  useEffect(() => {
    if (searchInput === "") {
      setSearchModal("recent");
    } else {
      setSearchModal("search");
    }
  }, [searchInput]);

  return (
    <div className="bg-gray-50 z-50 flex flex-col w-full flex-grow">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="border-b border-gray-300 flex items-center justify-center py-2 relative">
          <Link
            to="/"
            onClick={() => setCurrentPage("home")}
            className="ml-2 w-7"
          >
            <ChevronLeft />
          </Link>
          <input
            className=" w-full border border-gray-300 rounded-sm p-1 mx-2 bg-gray-50 text-center"
            type="text"
            placeholder="Search Users"
            onChange={(e) => updateSearch(e)}
          />
        </div>
      </form>

      {searchModal === "recent" && (
        <RecentSearchModal
          recentlyViewedUsers={recentlyViewedUsers}
          deleteSearchHistory={deleteSearchHistory}
          deleteSingleSearch={deleteSingleSearch}
        />
      )}
      {searchModal === "search" && searchResults && (
        <SearchModal searchResults={searchResults} storeSearch={storeSearch} />
      )}
    </div>
  );
}

export default MobileSearch;

function RecentSearchModal({
  recentlyViewedUsers,

  deleteSearchHistory,
  deleteSingleSearch,
}) {
  return (
    <div className="w-full h-full flex-grow bg-white z-50 flex flex-col items-center shadow-xl border-0 rounded-md p-3 relative">
      <div className="flex justify-between w-full">
        <span className="font-semibold text-lg">Recent</span>
        <span
          className="font-semibold text-sm text-blue-500 cursor-pointer"
          onClick={deleteSearchHistory}
        >
          Clear All
        </span>
      </div>
      <div className="w-full overflow-y-scroll h-full flex-grow">
        {recentlyViewedUsers &&
          recentlyViewedUsers.map((user) => {
            return (
              <div
                className="flex my-2 items-center w-full justify-between"
                key={user.id}
              >
                <Link to={`/view-user/${user.id}`}>
                  <div className="flex">
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
                  </div>
                </Link>
                <div
                  className="w-7 m-2"
                  onClick={() => deleteSingleSearch(user.id)}
                >
                  <Exit />
                </div>
              </div>
            );
          })}
        {recentlyViewedUsers.length === 0 && <div>No recent searches</div>}
      </div>
    </div>
  );
}

function SearchModal({ searchResults, storeSearch }) {
  return (
    <div className="w-full h-full bg-white z-50 flex flex-col items-center shadow-xl border-0 rounded-md p-3 overflow-y-scroll">
      <div className="w-full overflow-y-scroll">
        {searchResults.map((user) => {
          return (
            <div className="my-2" key={user.id}>
              <Link
                to={`/view-user/${user.id}`}
                onClick={() => storeSearch(user.id)}
              >
                <div className="flex items-center w-full justify-between">
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
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
