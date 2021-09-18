import React, { useState, useEffect, useContext } from "react";
import Exit from "../../../images/SVG/Exit";
import { UserContext } from "../../../pages/Main";
import getUserInfo from "../../../utils/getUserInfo/getUserInfo";
import useComponentVisible from "../../../hooks/useComponentVisible/useComponentVisible";
import { Link } from "react-router-dom";
import algoliasearch from "algoliasearch/lite";
import { firestore, FieldValue } from "../../../firebase/firebase";
import AlgoliaLogo from "../../../images/SVG/AlgoliaLogo";
import { motion } from "framer-motion";

const searchClient = algoliasearch(
  "JB4UGTXL86",
  "376e4fa2201e0406edaba9dd56057475"
);
const index = searchClient.initIndex("quicksnap_users");

function Search() {
  const [searchModal, setSearchModal] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const { uid } = useContext(UserContext);
  const [recentlyViewedUsers, setRecentlyViewedUsers] = useState([]);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  useEffect(() => {
    const unsub = firestore
      .collection("users")
      .doc(uid)
      .onSnapshot((snap) => {
        if (snap.exists) {
          const unpacked = snap.data();
          setPreviousSearches(unpacked.searches);
        }
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
    setIsComponentVisible(false);
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
    if (isComponentVisible && searchInput === "") {
      setSearchModal("recent");
    } else if (isComponentVisible && searchInput !== "") {
      setSearchModal("search");
    }
  }, [searchInput, isComponentVisible]);

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
  }, [isComponentVisible, searchInput]);

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 z-50">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className=" w-4/5 mx-3.5 border border-gray-300 rounded-sm p-1 bg-gray-50 text-center"
          type="text"
          placeholder="Search"
          onClick={() => setIsComponentVisible(true)}
          onChange={(e) => updateSearch(e)}
        />
      </form>
      <div
        className="absolute top-14 left-1/2 transform -translate-x-1/2"
        ref={ref}
      >
        {isComponentVisible && (
          <div className="flex flex-col items-center">
            {searchModal === "recent" && (
              <>
                <div className="w-4 h-4 transform rotate-45 bg-white absolute -top-2 shadow-lg z-40"></div>
                <RecentSearchModal
                  recentlyViewedUsers={recentlyViewedUsers}
                  setIsComponentVisible={setIsComponentVisible}
                  deleteSearchHistory={deleteSearchHistory}
                  deleteSingleSearch={deleteSingleSearch}
                />
              </>
            )}
            {searchModal === "search" && searchResults && (
              <>
                <div className="w-4 h-4 transform rotate-45 bg-white absolute -top-2 shadow-lg z-40"></div>
                <SearchModal
                  searchResults={searchResults}
                  storeSearch={storeSearch}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;

function RecentSearchModal({
  recentlyViewedUsers,
  setIsComponentVisible,
  deleteSearchHistory,
  deleteSingleSearch,
}) {
  return (
    <div className="w-80 h-96 bg-white z-50 flex flex-col items-center shadow-xl border-0 rounded-md py-3 relative">
      <div className="flex justify-between w-full px-3">
        <span className="font-semibold text-lg">Recent</span>
        <span
          className="font-semibold text-sm text-blue-500 cursor-pointer"
          onClick={deleteSearchHistory}
        >
          Clear All
        </span>
      </div>
      <div className="w-full overflow-y-scroll overflow-x-visible z-50 px-3">
        {recentlyViewedUsers &&
          recentlyViewedUsers.map((user) => {
            return (
              <motion.div
                className="flex my-2 items-center w-full justify-between"
                key={user.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  to={`/view-user/${user.id}`}
                  onClick={() => setIsComponentVisible(false)}
                >
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
              </motion.div>
            );
          })}
        {recentlyViewedUsers.length === 0 && <div>No recent searches</div>}
      </div>
      <div className="absolute bottom-0 right-0 m-2">
        <AlgoliaLogo />
      </div>
    </div>
  );
}

function SearchModal({ searchResults, storeSearch }) {
  return (
    <div className="w-80 h-96 bg-white z-50 flex flex-col items-center shadow-xl border-0 rounded-md py-3 overflow-y-scroll">
      <div className="w-full overflow-y-scroll">
        {searchResults.map((user) => {
          return (
            <motion.div
              className="my-2 px-3"
              key={user.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
