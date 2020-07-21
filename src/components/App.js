import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";

import Asset from "./Asset";
import Assets from "./Assets";
import configureStore from "../store";

function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        <Switch>
          <Route path="/:contractAddress/:tokenId">
            <Asset />
          </Route>
          <Route exact path="/">
            <Assets />
          </Route>
          <Route path="*">
            <h1>Not Found</h1>
            <Link to="/">Go home</Link>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
