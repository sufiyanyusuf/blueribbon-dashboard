// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import { NavLink,Route,Link,withRouter } from "react-router-dom";
import { Button,Container,Row,Col,Navbar,Nav,Image } from "react-bootstrap";
import { ReactComponent as Logo } from '../assets/img/loreal.svg';
import {StateContext,DispatchContext} from '../redux/contexts';
import Actions from '../redux/actions';
import axios from 'axios';
import Api from '../utils/endpoints'
const NavBar = (props) => {

  const showNewSubNav = props.location.pathname.includes('/listing/edit');

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

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
      paddingTop:15
    },
    navbarBottomDivider:{
      marginTop:10,
      height:1,
      backgroundColor:"#E7E7E7",
      width:"auto"
    },
    logo:{
      width:50,
      height:"auto"
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

  const nextPressed = (currentPath)=>{

    if (currentPath.includes('/listing/edit/productInfo')){
      
      console.log('gonna request, prestate - ',state.currentProductInfo);

      if (state.currentListing.id === ''){

        axios.post(Api().createListing, {
          title:state.currentProductInfo.title,
          org_id:2,
          description:state.currentProductInfo.description,
          type:'product',
          image_url:state.currentProductInfo.imageUrl,
          currency:state.currentProductInfo.currency,
          base_price:state.currentProductInfo.basePrice
        }).then(res =>{
          const listing = res.data.listing;
          console.log(listing);

          if (listing.id !== state.currentProductInfo.id){
            dispatch({ type: Actions.productInfo.updateID, id:listing.productInfo.id});
          }

          if (listing.id !== state.currentListingID){
            dispatch({ type: Actions.listing.updateNewListingID, id:listing.id});
          }
          
        });
      }else{
        console.log('update product info for listing id',state.currentListing.id)
        
        axios.put(Api().updateProductInfo, {
          title:state.currentProductInfo.title,
          org_id:2,
          description:state.currentProductInfo.description,
          type:state.currentProductInfo.type,
          listing_id:state.currentListing.id,
          image_url:state.currentProductInfo.imageUrl,
          currency:state.currentProductInfo.currency,
          base_price:state.currentProductInfo.basePrice
        }).then(res =>{
          console.log('updation response',res)
          //show feedback toast
        });

      }

    }

  }

  const getNext = (currentPath)=>{
    
    if (currentPath.includes('/listing/edit/productInfo')){
      return '/listing/edit/locationForm';
    }

    if (currentPath.includes('/listing/edit/locationForm')){
      return '/listing/edit/modifierForm';
    }

    if (currentPath.includes('/listing/edit/modifierForm')){
      return '/listing/edit/fulfillmentForm';
    }


    if (currentPath.includes('/listing/edit/fulfillmentForm')){
      return '/listing/edit/publishForm';
    }

    return '/';

  }

  return (
    <div>
    {(isAuthenticated && !showNewSubNav) && (

      <Container fluid={true}>
        <div style={styles.spacer10}></div>

        <Row>
          <NavLink to="/" style={{textDecoration:"none"}}>  
            <Col>
              <Image style = {styles.logo} src={'https://storage.googleapis.com/blueribbon/Copy%20of%20mnslogo-1.jpg'} fluid/>
            </Col>
          </NavLink>

      
          <Col sm style={styles.navbarLinks}>
            <MenuLink activeOnlyWhenExact={true} to="/" label="Listing" />
            <MenuLink to="/upcoming" label="Upcoming" />
            <MenuLink to="/referrals" label="Referrals" />
            <MenuLink to="/sales" label="Sales" />
            <MenuLink to="/profile" label="Customers" />
            <MenuLink to="/profile" label="Issues" />
          </Col>


          <NavLink to='/login' style={{textDecoration:"none"}} onClick = {()=>logout()}>
                <Col sm><Button>Logout</Button></Col>
          </NavLink>
        </Row>

        <Row style={styles.navbarBottomDivider}></Row>
      </Container>

    )}

    {(isAuthenticated && showNewSubNav) &&(

      <Container fluid={true}>

          <div style={styles.spacer10}></div>
            <Row>
              <NavLink to="/" style={{textDecoration:"none"}}>
                <Col sm><Button variant="danger">Exit</Button></Col>
              </NavLink>

              <Col sm style={styles.navbarLinks}>
                <MenuLink to="/listing/edit/productInfo/" label="1.Product Info" />
                <MenuLink to="/listing/edit/locationForm/" label="2.Locations" />
                <MenuLink to="/listing/edit/modifierForm/" label="3.Modifiers" />
                <MenuLink to="/listing/edit/fulfillmentForm/" label="4.Fulfillment" />
                <MenuLink to="/listing/edit/publishForm/" label="5.Publish" />
              </Col>

              <NavLink to={getNext(props.location.pathname)} style={{textDecoration:"none"}} onClick = {()=>nextPressed(props.location.pathname)}>
                <Col sm><Button>Next</Button></Col>
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

