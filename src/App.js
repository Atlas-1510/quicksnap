import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import { createContext } from "react";

export const UserContext = createContext(null);

function App() {
  const user = {
    id: 1,
    name: "iamjasona",
  };

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
