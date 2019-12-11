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
import { createListing, updateProductInfo } from '../utils/Api'


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
      color:'#2C43A3'
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

  const nextPressed = async (currentPath) => {

    if (currentPath.includes('/listing/edit/productInfo')){
      
      if (state.currentListing.id === ''){

        try {

          let params = {
            title:state.currentProductInfo.title,
            description:state.currentProductInfo.description,
            type:'product',
            image_url:state.currentProductInfo.imageUrl,
            currency:state.currentProductInfo.currency,
            base_price:state.currentProductInfo.basePrice
          } 

          const res = await createListing(state.accessToken, params)
          const listing = res.data.listing;
          console.log(listing);

          if (listing.id !== state.currentProductInfo.id){
            dispatch({ type: Actions.productInfo.updateID, id:listing.productInfo.id});
          }

          if (listing.id !== state.currentListingID){
            dispatch({ type: Actions.listing.updateNewListingID, id:listing.id});
          }

        }catch(e){
          console.log(e)
        }


      }else{
        console.log('update product info for listing id',state.currentListing.id)
          let params = {
            title:state.currentProductInfo.title,
            description:state.currentProductInfo.description,
            type:state.currentProductInfo.type,
            listing_id:state.currentListing.id,
            image_url:state.currentProductInfo.imageUrl,
            currency:state.currentProductInfo.currency,
            base_price:state.currentProductInfo.basePrice
          }
        try {
          const res = await updateProductInfo(state.accessToken, params)
          
        }catch(e){
          console.log(e)
        }
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

  console.log(state)
  
  return (
    <div>
    {(isAuthenticated && !showNewSubNav) && (

      <Container fluid={true}>
        <div style={styles.spacer10}></div>

        <Row>
          <NavLink to="/" style={{textDecoration:"none"}}>  
            <Col>
              <Image style = {styles.logo} src={state.businessProfile.logo} fluid/>
            </Col>
          </NavLink>

      
          <Col sm style={styles.navbarLinks}>
            <MenuLink activeOnlyWhenExact={true} to="/" label="Listing" />
            <MenuLink to="/upcoming" label="Orders" />
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


  );

  
};

export default withRouter(NavBar);

