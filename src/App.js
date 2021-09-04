import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login/Login";

// export const UserContext = createContext(null);

function App() {
  const [uid, setUID] = useState(null);

  return (
    <Router>
      <Switch>
        <Route
          path=""
          render={() => {
            if (uid) {
              return <Main uid={uid} />;
            } else {
              return <Login setUID={setUID} />;
            }
          }}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
