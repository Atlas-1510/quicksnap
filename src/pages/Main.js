import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "./Home";
import Messenger from "./Messenger";
import Liked from "./Liked";
import Explore from "./Explore";

function Main() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="bg-gray-100 pt-12 flex flex-col min-h-full items-center">
        <div className="md:w-2/3 md:max-w-4xl">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/messenger">
              <Messenger />
            </Route>
            <Route exact path="/liked">
              <Liked />
            </Route>
            <Route exact path="/explore">
              <Explore />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}

export default Main;
