// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import { Link } from "react-router-dom";
import { Button,Container,Row,Col } from "react-bootstrap";
import { ReactComponent as Logo } from '../assets/img/logo.svg';

const NavBar = (props) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  let styles = {
    spacer10:{
      height:10,
      width:10  
    },
    link:{
      textDecoration:"none"
    },
    navbarLinks:{
      paddingTop:10
    },
    navbarBottomDivider:{
      marginTop:10,
      height:1,
      backgroundColor:"#E7E7E7",
      width:"auto"
    }
  }
  return (
    <div>
    {isAuthenticated && (
      <Container fluid={true}>
        <div style={styles.spacer10}></div>
        <Row>
          <Col md={1}><Logo/></Col>
          <Col md={{span:10,offset:0}} style={styles.navbarLinks}>
            <Link to="/" style={styles.link} >Listing&emsp;</Link>
            <Link to="/profile" style={styles.link}>&emsp;Upcoming&emsp;</Link>
            <Link to="/profile" style={styles.link}>&emsp;Customers&emsp;</Link>
            <Link to="/profile" style={styles.link}>&emsp;Sales&emsp;</Link>
            <Link to="/profile" style={styles.link}>&emsp;Issues</Link>
          </Col>
          <Col md={{span:1,offset:0}}><Button onClick={() => logout()}>Logout</Button></Col>
        </Row>
        <Row style={styles.navbarBottomDivider}></Row>
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

