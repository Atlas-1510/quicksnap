import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import { createContext } from "react";
import testUserProfileImage from "./images/test-images/testUserProfileImage.jpg";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase/firebase";
import getFirestore from "./firebase/getFirestore";

export const UserContext = createContext(null);

function App() {
  const [session] = useAuthState(auth);
  const [user, setUser] = useState(null);
  // TODO: Replace manual user state setting with context/reducer
  // const userInfo = {
  //   id: 1,
  //   name: "iamjasona",
  //   displayImage: testUserProfileImage,
  //   postCount: 18,
  //   followerCount: 74,
  //   followingCount: 134,
  //   logOut: () => {}, // TODO: update placeholder function
  // };
  // const user = null;

  const getUserInfo = async (uid) => {
    const ref = firestore.collection("users").doc(uid);
    const userInfo = await getFirestore(ref);
    setUser(userInfo);
  };

  return (
    <Router>
      <Switch>
        <UserContext.Provider value={user}>
          <Route
            path=""
            render={() => {
              if (session && user) {
                return <Main />;
              } else {
                return <Login getUserInfo={getUserInfo} />;
              }
            }}
          ></Route>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
