import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "./Home";
import Messenger from "./Messenger/Messenger";
import User from "./User/User";

function Main() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
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
  );
}

export default Main;
