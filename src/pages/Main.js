import React, { useState, createContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "./Home/Home";
import Messenger from "./Messenger/Messenger";
import User from "./User/User";
import { useDocument } from "react-firebase-hooks/firestore";
import { firestore, storage } from "../firebase/firebase";
import ViewAnotherUser from "./ViewAnotherUser/ViewAnotherUser";
import BottomMobileNav from "../components/BottomMobileNav";
import MobileSearch from "../components/Header/Search/MobileSearch";

export const UserContext = createContext(null);

function Main({ uid }) {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  const [packedUser] = useDocument(firestore.doc(`users/${uid}`));

  useEffect(() => {
    if (packedUser) {
      (async () => {
        const unpackedUser = packedUser.data();
        if (unpackedUser.customProfileImage) {
          const gsProfileImageURL = unpackedUser.profileImage;
          let ref = await storage
            .refFromURL(gsProfileImageURL)
            .getDownloadURL();
          setUser({
            ...unpackedUser,
            uid,
            profileImage: ref,
          });
        } else {
          setUser({
            ...unpackedUser,
            uid,
          });
        }
      })();
    }
  }, [uid, packedUser]);

  return (
    <>
      {user && (
        <UserContext.Provider value={user}>
          <div className="flex flex-col h-screen overflow-auto relative">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="bg-gray-100 flex justify-center h-full flex-grow overflow-scroll">
              <div className="md:w-2/3 md:max-w-4xl h-full w-full flex flex-col">
                <div className="flex-grow">
                  <Switch>
                    <Route exact path="/">
                      <Home setCurrentPage={setCurrentPage} />
                    </Route>
                    <Route exact path="/messenger">
                      <Messenger setCurrentPage={setCurrentPage} />
                    </Route>
                    <Route exact path="/user" component={User} />
                    <Route path="/view-user/:id" component={ViewAnotherUser} />
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
