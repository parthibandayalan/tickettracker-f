import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../pages/common/Dashboard";
import LoginComponent from "../pages/common/LoginComponent";
import SignIn from "../pages/common/SignIn";

class MainPage extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/login" component={LoginComponent} />
            <Route path="/signin" component={SignIn} />
            <Route path="/dash" component={Dashboard} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default MainPage;
