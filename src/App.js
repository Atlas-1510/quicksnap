import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";

function App() {
  const user = true;

  return (
    <Router>
      <Switch>
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
      </Switch>
    </Router>
  );
}

export default App;
