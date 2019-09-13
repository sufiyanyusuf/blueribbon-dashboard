
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Alert} from 'react-bootstrap';
import './styles/index.css'

import NavBar from "./components/navbar";
import { useAuth0 } from "./react-auth0-wrapper";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import Profile from "./components/profile";
import Login from "./views/loginScreen";
import Listing from "./views/Listing";

function App() {

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  console.log("auth ? ",isAuthenticated);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated === false
        ? <Redirect to='/login' />
        : <Component {...props} />
    )} />
  )

  return (
    <div className="App">
      {/* New - use BrowserRouter to provide access to /profile */}
      <Router>
        {isAuthenticated && (
          <NavBar/>
        )}
        <Switch>
          <PrivateRoute exact path="/" component={Listing} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
