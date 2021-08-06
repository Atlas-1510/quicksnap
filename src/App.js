import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const user = true;

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (user) {
              return <Home />;
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
