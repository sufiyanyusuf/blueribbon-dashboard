// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import { NavLink,Route,Link,withRouter } from "react-router-dom";
import { Button,Container,Row,Col,Navbar,Nav } from "react-bootstrap";
import { ReactComponent as Logo } from '../assets/img/logo.svg';

const NavBar = (props) => {

  const showNewSubNav = props.location.pathname.includes('/listing/new');

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  let styles = {
    spacer10:{
      height:10,
      width:10  
    },
    link:{
      textDecoration:"none",
      color:'#B2B2B2'
    },
    activeLink:{
      textDecoration:"none",
      color:'#0A71F2'
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

  function MenuLink({ label, to, activeOnlyWhenExact }) {
    return (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
            <Link className={match ? "active" : "inactive"} style = { match ? styles.activeLink : styles.link} to={to}>{label}&emsp;</Link>
        )}
      />
    );
  }

  function getNext(currentPath){
    if (currentPath.includes('/listing/new/productInfo')){
      return '/listing/new/locationForm';
    }

    if (currentPath.includes('/listing/new/locationForm')){
      return '/listing/new/modifierForm';
    }

    if (currentPath.includes('/listing/new/modifierForm')){
      return '/listing/new/pricingForm';
    }

    if (currentPath.includes('/listing/new/pricingForm')){
      return '/listing/new/fulfillmentForm';
    }

    if (currentPath.includes('/listing/new/fulfillmentForm')){
      return '/';
    }

    return '/';

  }

  return (
    <div>
    {(isAuthenticated && !showNewSubNav) && (

      <Container fluid={true}>
        <div style={styles.spacer10}></div>
        <Row>
          <Col md={1}><Logo/></Col>
          <Col md={{span:10,offset:0}} style={styles.navbarLinks}>
            <MenuLink activeOnlyWhenExact={true} to="/" label="Listing" />
            <MenuLink to="/profile" label="Upcoming" />
            <MenuLink to="/profile" label="Customers" />
            <MenuLink to="/profile" label="Sales" />
            <MenuLink to="/profile" label="Issues" />
          </Col>
          <Col md={{span:1,offset:0}}><Button onClick={() => logout()}>Logout</Button></Col>
        </Row>
        <Row style={styles.navbarBottomDivider}></Row>
      </Container>

    )}

    {(isAuthenticated && showNewSubNav) &&(

      <Container fluid={true}>
        <div style={styles.spacer10}></div>
        <Row>
          <NavLink to="/" style={{textDecoration:"none"}}>
            <Col md={{span:1,offset:0}}><Button variant="danger">Exit</Button></Col>
          </NavLink>

          <Col md={{span:10,offset:0}} style={styles.navbarLinks}>
            <MenuLink to="/listing/new/productInfo" label="1.Product Info" />
            <MenuLink to="/listing/new/locationForm" label="2.Locations" />
            <MenuLink to="/listing/new/modifierForm" label="3.Modifiers" />
            <MenuLink to="/listing/new/pricingForm" label="4.Pricing" />
            <MenuLink to="/listing/new/fulfillmentForm" label="5.Fulfillment" />
          </Col>

          <NavLink to={getNext(props.location.pathname)} style={{textDecoration:"none"}}>
            <Col md={{span:1,offset:0}}><Button>Next</Button></Col>
          </NavLink>

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


    // <div>
    // {isAuthenticated && (
    //   <Container fluid={true}>
    //     <div style={styles.spacer10}></div>
    //     <Row>
    //       <Col md={1}><Logo/></Col>
    //       <Col md={{span:10,offset:0}} style={styles.navbarLinks}>
    //         <NavLink to="/" style={styles.link} activeStyle={styles.activeLink}>Listing&emsp;</NavLink>
    //         <NavLink to="/profile" style={styles.link} activeStyle={styles.activeLink}>&emsp;Upcoming&emsp;</NavLink>
    //         <NavLink to="/profile" style={styles.link} activeStyle={styles.activeLink}>&emsp;Customers&emsp;</NavLink>
    //         <NavLink to="/profile" style={styles.link} activeStyle={styles.activeLink}>&emsp;Sales&emsp;</NavLink>
    //         <NavLink to="/profile" style={styles.link} activeStyle={styles.activeLink}>&emsp;Issues</NavLink>
    //       </Col>
    //       <Col md={{span:1,offset:0}}><Button onClick={() => logout()}>Logout</Button></Col>
    //     </Row>
    //     <Row style={styles.navbarBottomDivider}></Row>
    //   </Container>
    // )}
      
    // {!isAuthenticated && (
    //   <button
    //     onClick={() =>
    //       loginWithRedirect({})
    //     }
    //   >
    //     Log in
    //   </button>
    // )}
    
    // </div>


  );

  
};

export default withRouter(NavBar);

