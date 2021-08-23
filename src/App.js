import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import { createContext } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase/firebase";
import getFirestore from "./firebase/getFirestore";

export const UserContext = createContext(null);

function App() {
  const [session] = useAuthState(auth);
  const [user, setUser] = useState(null);

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
