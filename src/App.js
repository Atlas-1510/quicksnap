import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login/Login";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

// export const UserContext = createContext(null);

function App() {
  const [session] = useAuthState(auth);
  const [uid, setUID] = useState(null);

  return (
    <Router>
      <Switch>
        <Route
          path=""
          render={() => {
            if (session) {
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
