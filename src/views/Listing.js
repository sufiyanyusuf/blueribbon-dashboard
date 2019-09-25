import React,{useEffect} from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import { Container,Row,Col } from "react-bootstrap";
import Tile from "../components/tile";
import ListHeader from "../components/subscriptionListHeader";
import ListItem from "../components/subscriptionListItem";
import {NavLink} from 'react-router-dom';
import {StateContext,DispatchContext} from '../redux/contexts';
import axios from 'axios';
import uuid from 'uuid/v4';
import Actions from '../redux/actions';
import Api from '../utils/endpoints'


const Listing = () => {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const { loading, user } = useAuth0();


  useEffect(() => {
    // Fetch lists
    console.log(Api().getListing);
    axios.get(Api().getListing)
      .then(res => {
        const listings = res.data[0].listings;
        let _listings = listings.map((listing) => {
          return {
             key: listing.id,
             date: listing.created_at,
             title: listing.title,
             status:listing.status,
             count: 0
          }
        });

        //check for change before dispatch
        if (JSON.stringify(_listings)!==JSON.stringify(state.subscriptions)){
          dispatch({ type: Actions.listing.updateAll, listings:_listings});
        }
        
      })
  });


  console.log(state);

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }

  function SubscriptionList(props) {
    const subscriptions = state.subscriptions;
    const listItems = subscriptions.map((subscription) =>
     
      <ListItem key= {subscription.key} subscription={subscription} selected={()=>console.log("clicked",subscription.key)}/>

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
          <NavLink to="/listing/new/productInfo" style={{textDecoration:"none"}}>
            <Tile icon="https://image.flaticon.com/icons/png/512/51/51057.png" title = "Coupons, On Demand" tilePressed = { () => { console.log('pressed') } }/>
          </NavLink>
         </Col>
        <Col>
          <NavLink to="/listing/new/productInfo" style={{textDecoration:"none"}}>
            <Tile icon="https://image.flaticon.com/icons/png/512/51/51057.png" title = "Scheduled, Recurring" tilePressed = { () => { console.log('pressed') } }/>
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