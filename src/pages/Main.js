import React, { useState, createContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "./Home/Home";
import Messenger from "./Messenger/Messenger";
import User from "./User/User";
import { useDocument } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase/firebase";
import ViewAnotherUser from "./ViewAnotherUser/ViewAnotherUser";
import BottomMobileNav from "../components/BottomMobileNav";
import MobileSearch from "../components/Header/Search/MobileSearch";
import useGetFeed from "../hooks/useGetFeed/useGetFeed";

export const UserContext = createContext(null);
export const FeedContext = createContext(null);

function Main({ uid }) {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [packedUser] = useDocument(firestore.doc(`users/${uid}`));
  const { feed, updateFeed } = useGetFeed(uid);

  useEffect(() => {
    if (packedUser !== undefined) {
      (async () => {
        const unpackedUser = packedUser.data();
        setUser({
          ...unpackedUser,
          uid,
        });
      })();
    }
  }, [uid, packedUser]);

  return (
    <>
      {user && (
        <UserContext.Provider value={user}>
          <div className="flex flex-col h-screen overflow-auto relative">
            <FeedContext.Provider value={{ feed, updateFeed }}>
              <Header
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </FeedContext.Provider>
            <div className="bg-gray-100 flex justify-center h-full flex-grow overflow-scroll">
              <div className="md:w-2/3 md:max-w-4xl h-full w-full flex flex-col">
                <div className="flex-grow overflow-scroll">
                  <Switch>
                    <Route exact path="/">
                      <FeedContext.Provider value={{ feed, updateFeed }}>
                        <Home setCurrentPage={setCurrentPage} />
                      </FeedContext.Provider>
                    </Route>
                    <Route exact path="/messenger/:id">
                      <Messenger setCurrentPage={setCurrentPage} />
                    </Route>
                    <Route exact path="/user">
                      <User setCurrentPage={setCurrentPage} />
                    </Route>
                    <Route path="/view-user/:id">
                      <ViewAnotherUser setCurrentPage={setCurrentPage} />
                    </Route>
                    <Route path="/search">
                      <MobileSearch setCurrentPage={setCurrentPage} />
                    </Route>
                  </Switch>
                </div>
                <BottomMobileNav
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </UserContext.Provider>
      )}
    </>
  );
}

export default Main;
