import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "./Home";
import Messenger from "./Messenger";

function Main() {
  return (
    <>
      <Header />
      <div className="bg-gray-200 pt-12 flex flex-col min-h-full">
        <Switch>
          <Route exact path="/" component={Home}></Route>
        </Switch>
        <Switch>
          <Route exact path="messenger">
            <Messenger />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Main;
