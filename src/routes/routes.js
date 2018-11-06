import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import ChatPage from "../containers/ChatPage";
import LoginPage from "../component/loginpage";

import broswerHistory from "./history";

const routes = [
  (
    <Route
      key={'login'}
      path={'/login'}
      exact={true}
      component={LoginPage}
    />
  ),
  (
    <Route
      key={'chatPage'}
      path={'/chatPage'}
      exact={true}
      component={ChatPage}
    />
  )
];

const routesMain = () => {
  return (
    <Router history={broswerHistory}>
      <Switch>
        {routes}
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default routesMain;
