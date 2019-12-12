import React,{useEffect, useState} from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import { Container,Row,Col } from "react-bootstrap";
import Tile from "../components/tile";
import ListHeader from "../components/subscriptionListHeader";
import ListItem from "../components/subscriptionListItem";
import {NavLink} from 'react-router-dom';
import {StateContext,DispatchContext} from '../redux/contexts';

import Actions from '../redux/actions';
import {getListings} from '../utils/Api';

const Listing = () => {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const { loading, user, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    // Fetch lists
 
    const fetchListings = async () => { 

      try { 

        let token = state.accessToken
        let res = await getListings(token)
        
        console.log(res)

        const listings = res.data;
        let _listings = listings.map((listing) => {

          const options = {year: 'numeric', month: 'short', day: 'numeric' };
          const date  = new Date(listing.created_at);
          const formattedDate = date.toLocaleDateString("en-US", options);

          return {
            key: listing.id,
            date: formattedDate,
            title: listing.title,
            status:listing.status,
            count: 0
          }
          
        });

        //check for change before dispatch
        if (JSON.stringify(_listings)!==JSON.stringify(state.subscriptions)){
          dispatch({ type: Actions.listing.updateAll, listings:_listings});
        }

        console.log(state.currentListing)

        if (state.currentListing.id && state.currentListing.id !== ''){
          dispatch({type:Actions.listing.updateCurrentListing,listing:{}});
          dispatch({type:Actions.listing.updateNewListingID,id:''});
          dispatch({type:Actions.serviceAreas.updateServiceAreas,areas:[]});
          dispatch({type:Actions.productInfo.clear});
        }
        
      
        
      } catch (e) {
        console.log(e)
      }
      

    }

    fetchListings()
  
    
  },[]);



  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }

  const selectListing = (listing) => {
    if (state.currentListing.id !== listing.key){
      dispatch({type:Actions.listing.updateCurrentListing,listing:listing});
    }
    
  }

  function SubscriptionList(props) {
    const subscriptions = state.subscriptions;
    const listItems = subscriptions.map((subscription) =>
     
      <ListItem key= {subscription.key} subscription={subscription} selected={()=>selectListing(subscription)}/>

    );
    return (
        listItems
    );
  }
  
  const subscriptions = [{key:1,date:"date",title:"title",status:"live",count:"232"},{key:2,date:"date",title:"title",status:"live",count:"232"}];
  // <Tile icon="https://image.flaticon.com/icons/png/512/51/51057.png" title = "Coupons, On Demand" tilePressed = { () => { dispatch({ type: 'ADD_SUBSCRIPTION', key:uuid(),date:"date",title:"title",status:"draft",count:"-"}); } }/>
  // dispatch({ type: 'NEW_SUBSCRIPTION', flowTitle:'CreateSubscriptionFlow'});    
  return (
    <Container>

    <div style={styles.spacer80}></div>
      <Row>
        <h1>
          Create A New Subscription
        </h1>
      </Row>

      <div style={styles.spacer20}></div>
      <Row>
        <Col>
          <NavLink to="/listing/edit/productInfo/" style={{textDecoration:"none"}}>
            <Tile icon="Coupon.svg" title = "Coupons, On Demand" tilePressed = { () => { console.log('pressed') } }/>
          </NavLink>
         </Col>
        <Col>
          <NavLink to="/listing/edit/productInfo/" style={{textDecoration:"none"}}>
            <Tile icon="Schedule.svg" title = "Scheduled, Recurring" tilePressed = { () => { console.log('pressed') } }/>
          </NavLink>
        </Col>
      </Row>
      <div style={styles.spacer80}></div>
      
      <div style = {styles.table}>
        <ListHeader/>
        <SubscriptionList subscriptions={subscriptions} />
      </div>

    </Container>
  );
};

let styles = {
  spacer80:{
    height:80,
    width:80  
  },
  spacer20:{
    height:20,
    width:20  
  },
  table:{
    textAlign:"left"
  }
}


export default Listing;