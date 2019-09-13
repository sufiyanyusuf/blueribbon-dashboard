import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import { Button,Container,Row,Col } from "react-bootstrap";
import Tile from "../components/tile";
import ListHeader from "../components/subscriptionListHeader";
import ListItem from "../components/subscriptionListItem";

const Listing = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }

  function SubscriptionList(props) {

    const subscriptions = props.subscriptions;

    const listItems = subscriptions.map((subscription) =>
      <ListItem key= {subscription.key} subscription={subscription} selected={()=>console.log("clicked",subscription.key)}/>
    );
    return (
        listItems
    );
  }
  
  const subscriptions = [{key:1,date:"date",title:"title",status:"live",count:"232"},{key:2,date:"date",title:"title",status:"live",count:"232"}];

  return (
    <Container>
      <Row>
        <h1>
          Create A New Subscription
        </h1>
      </Row>
      <Row>
        <Col>
          <Tile icon="https://image.flaticon.com/icons/png/512/51/51057.png" title = "Coupons, On Demand" tilePressed = { () => { console.log('pressed') } }/>
        </Col>
        <Col>
          <Tile icon="https://image.flaticon.com/icons/png/512/51/51057.png" title = "Scheduled, Recurring" tilePressed = { () => { console.log('pressed') } }/>
        </Col>
      </Row>
      <div style={styles.spacer80}></div>
      <div style = {styles.table}>
        <ListHeader />
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
  table:{
    textAlign:"left"
  }
}


export default Listing;