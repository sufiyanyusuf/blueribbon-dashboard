// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import { Link } from "react-router-dom";
import { Button,Container,Row,Col } from "react-bootstrap";
import { ReactComponent as Logo } from '../assets/img/logo.svg';

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
    {isAuthenticated && (
      <Container>
        <Row>
          <Col sm><Logo/></Col>
          <Col sm>
            <Link to="/">Listing</Link>
            <Link to="/profile">Upcoming</Link>
            <Link to="/profile">Customers</Link>
            <Link to="/profile">Sales</Link>
            <Link to="/profile">Issues</Link>
          </Col>
          <Col sm><Button onClick={() => logout()}>Log out</Button></Col>
        </Row>
      </Container>
    )}
      
    {!isAuthenticated && (
      <button
        onClick={() =>
          loginWithRedirect({})
        }
      >
        Log in
      </button>
    )}
    
    </div>
  );
};

export default NavBar;

