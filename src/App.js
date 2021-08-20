import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import { createContext } from "react";
import testUserProfileImage from "./images/test-images/testUserProfileImage.jpg";

export const UserContext = createContext(null);

function App() {
  // TODO: Replace manual user state setting with context/reducer
  const user = {
    id: 1,
    name: "iamjasona",
    displayImage: testUserProfileImage,
    postCount: 18,
    followerCount: 74,
    followingCount: 134,
    logOut: () => {}, // TODO: update placeholder function
  };
  // const user = null;

  return (
    <Router>
      <Switch>
        <UserContext.Provider value={user}>
          <Route
            path=""
            render={() => {
              if (user) {
                return <Main />;
              } else {
                return <Login />;
              }
            }}
          ></Route>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
