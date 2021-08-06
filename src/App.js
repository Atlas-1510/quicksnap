import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
