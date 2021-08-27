import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "./Home";
import Messenger from "./Messenger/Messenger";
import User from "./User/User";
import { useDocument } from "react-firebase-hooks/firestore";
import { firestore, storage } from "../firebase/firebase";

export const UserContext = createContext(null);

function Main({ uid }) {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  const [packedUser] = useDocument(firestore.doc(`users/${uid}`));

  useEffect(() => {
    if (packedUser) {
      (async () => {
        const unpackedUser = packedUser.data();
        const gs = unpackedUser.profileImage;
        const ref = await storage.refFromURL(gs).getDownloadURL();

        setUser({
          ...unpackedUser,
          uid,
          profileImage: ref,
        });
      })();
    }
  }, [packedUser]);

  return (
    <>
      {user && (
        <UserContext.Provider value={user}>
          <div className="flex flex-col h-screen overflow-auto relative">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="bg-gray-100 flex justify-center h-full flex-grow overflow-scroll">
              <div className="md:w-2/3 md:max-w-4xl h-full w-full">
                <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/messenger">
                    <Messenger setCurrentPage={setCurrentPage} />
                  </Route>
                  <Route>
                    <User />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </UserContext.Provider>
      )}
    </>
  );
}

export default Main;
