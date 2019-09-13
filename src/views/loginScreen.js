// src/components/NavBar.js

import React from "react";
import { Link,Redirect } from "react-router-dom";
import { ReactComponent as Logo } from '../assets/img/logo.svg';
import Button from "react-bootstrap/Button";
import { useAuth0 } from "../react-auth0-wrapper";

const LoginScreen = (location) => {

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { from } = location.state || { from: { pathname: '/' }};
  
  if (isAuthenticated === true) {
    return <Redirect to={from} />
  }

  return (
    <div>
        <Logo />
        Welcome To BlueRibbon
        Please sign in to continue
        <Button 
            onClick={() =>
            loginWithRedirect({})
        }>Login</Button>
    </div>
  );

};

export default LoginScreen;

