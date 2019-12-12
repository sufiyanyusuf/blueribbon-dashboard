
import React,{useEffect, useState} from "react";
import 'react-vis/dist/style.css';
import { Container,Nav,Row,Col,Tab,Tabs,Badge,ListGroup,ListGroupItem,
  ButtonGroup,Button,Card,CardDeck,CardColumns,DropdownButton,Dropdown,
} from "react-bootstrap";
import { getOrders,updateOrderFulfillmentState } from '../utils/Api'
import {StateContext,DispatchContext} from '../redux/contexts';

const timeSince = (timestamp) => {
  const options = {year: 'numeric', month: 'short', day: 'numeric' };
  const date  = new Date(timestamp);
  // const formattedDate = date.toLocaleDateString("en-US", options);
  // return formattedDate

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const Upcoming = () => {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const [activeTab,setActiveTab] = useState(0)
  const [orders, setOrders] = useState([])
  const [pendingOrders, setPendingOrders] = useState([])
  const [initiatedOrders, setInitiatedOrders] = useState([])
  const [shippedOrders, setShippedOrders] = useState([])
  const [failedOrders, setFailedOrders] = useState([])
  const [fulfilledOrders, setFulfilledOrders] = useState([])

  const markOrder = async (action,subscriptionId) => {
    console.log(action,subscriptionId)
    if (action && subscriptionId) {

      try {
        let token = state.accessToken
        let params = {
          action:action,
          subscriptionId:subscriptionId
        }
        let orders = await updateOrderFulfillmentState(token, params)
        fetchOrders()

      } catch (error) {
        
      }

    }
  }

  const getSelectedOrders = () => {
    var params;
    switch(activeTab){
      case 0:
        params = 'active'
        return orders
        break
      case 1:
        params = 'pending'
        return pendingOrders
        break
      case 2:
        params = 'initiated'
        return initiatedOrders
        break
      case 3:
        params = 'shipped'
        return shippedOrders
        break
      case 4:
        params = 'failure'
        return failedOrders
        break
      case 5:
        params = 'successful'
        return fulfilledOrders
        break
      default:
        return orders
    }

  }

  const getOrderCards = () => {

    let orders = getSelectedOrders()

    if (orders.length < 1){
      return 
    }

    return orders.map((order,index) => {
      
      if (order && order.order && order.order.length>1 ){

        const orderProps = order.order[0].Product

        var _order = ''
        Object.keys(orderProps).map((key,index) => {
          _order=_order + capitalize(key)+' - '+Object.values(orderProps)[index]+'\n'
        })
      
      }

      const getOrderActions = () => {
        if (order.fulfillment_options && order.fulfillment_options.length>0){
          return order.fulfillment_options.map ( option => {
            return (<Dropdown.Item onSelect={()=>markOrder(option,order.subscription_id)}>{option}</Dropdown.Item>)
          })
        }
      }

      
      return (
        <Card>
          <Card.Body>
          <Card.Title><h5>{order.subscription_id}</h5></Card.Title>
          <Card.Text>
            {_order}
          </Card.Text>
          <Dropdown as={ButtonGroup}>
            <Button variant="primary" href="#/action-1">{capitalize(order.fulfillment_state)}</Button>

            <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

            <Dropdown.Menu>
              {getOrderActions()}
            </Dropdown.Menu>
          </Dropdown>
          <br></br>
        </Card.Body>
          {/* <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Card.Link href="#">View Details</Card.Link>
            </ListGroupItem>

            <ListGroupItem>
              <Card.Link href="#">Add Reminder</Card.Link>
            </ListGroupItem>
          </ListGroup> */}
          <Card.Footer>
            <small className="text-muted">{timeSince(order.timestamp)} ago</small>
          </Card.Footer>
        </Card>
      )
    })
  }

  const getActiveTab = () => {
    var params = 'pending'
    switch(activeTab){
      case 0:
        params = 'active'
        break
      case 1:
        params = 'pending'
        break
      case 2:
        params = 'initiated'
        break
      case 3:
        params = 'shipped'
        break
      case 4:
        params = 'failure'
        break
      case 5:
        params = 'successful'
        break
      default:
        params = 'pending'
    }
    return params
  }

  // Fetch lists
  const fetchOrders = async () => {

    try {

      let token = state.accessToken
      let orders = await getOrders(token)

      setOrders(orders)
      let initiatedOrders = orders.filter(order => order.fulfillment_state === 'initiated')
      setInitiatedOrders(initiatedOrders)
      let pendingOrders = orders.filter(order => order.fulfillment_state === 'pending')
      setPendingOrders(pendingOrders)
      let shippedOrders = orders.filter(order => order.fulfillment_state === 'shipped')
      setShippedOrders(shippedOrders)
      let failedOrders = orders.filter(order => order.fulfillment_state === 'failure')
      setFailedOrders(failedOrders)
      let fulfilledOrders = orders.filter(order => order.fulfillment_state === 'successful')
      setFulfilledOrders(fulfilledOrders)

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    
    fetchOrders()
    
    // axios.get(Api(params).getOrders)
    //   .then(res => {
    //     setOrders(res.data)
    // })
    
    },[activeTab]);
  
  const selectTab = (key) => {
    setActiveTab(key)
  }

  return (
    <div style={{textAlign: "left"}}> 
 
      <Tab.Container id="sidebar">
          <Row>
            <Col md={2}>

              <ButtonGroup className="flex-column d-flex">

                <Button eventKey={0} variant="white" style={styles.navLink} onClick={()=>selectTab(0)} active = {activeTab == 0}>
                  <span>Active&ensp;</span>
                <Badge variant="primary" style={styles.badge}>{orders.length}</Badge>
                </Button>
                <Button eventKey={1} variant="white" style={styles.navLink} onClick={()=>selectTab(1)} active = {activeTab == 1}>
                    <span>Pending&ensp;</span> 
                    <Badge variant="secondary" style={styles.badge}>{pendingOrders.length}</Badge>
                </Button>
                <Button eventKey={2} variant="white" style={styles.navLink} onClick={()=>selectTab(2)} active = {activeTab == 2}>
                    <span>Initiated&ensp;</span>
                    <Badge variant="warning" style={styles.badge}>{initiatedOrders.length}</Badge>
                </Button>
                <Button eventKey={3} variant="white" style={styles.navLink} onClick={()=>selectTab(3)} active = {activeTab == 3}>
                    <span>Shipped&nbsp;</span>
                    <Badge variant="warning" style={styles.badge}>{shippedOrders.length}</Badge> 
                </Button>
                <Button eventKey={4} variant="white" style={styles.navLink} onClick={()=>selectTab(4)} active = {activeTab == 4}>
                    <span>Failures&nbsp;</span>
                    <Badge variant="danger" style={styles.badge}>{failedOrders.length}</Badge> 
                </Button>
                <Button eventKey={5} variant="white" style={styles.navLink} onClick={()=>selectTab(5)} active = {activeTab == 5}>
                    <span>Fulfilled&nbsp;</span> 
                    <Badge variant="success" style={styles.badge}>{fulfilledOrders.length}</Badge> 
                </Button>
              </ButtonGroup>
              
              </Col>
              <Col sm={6}>
        
              <Tab.Content>
              <br></br>
            
                <CardColumns>

                  {getOrderCards()}

                </CardColumns>
                
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
    
    </div>
  );
}

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
    },
    sidebar:{
      position:'fixed',
      flex:1,

      // backgroundColor: '#eeeeee',
    },
    navbarBottomDivider:{
      marginTop:5,
      marginBottom:5,
      height:1,
      backgroundColor:"#E7E7E7",
      width:"auto"
    },
    navLink:{
      textAlign:'left',
      flex:1,
    },
    link:{
      textDecoration:"none",
      color:'#B2B2B2'
    },
    activeLink:{
      textDecoration:"none",
      color:'#0A71F2'
    },
    badge:{
      position: 'absolute',
      right:'10%',
      top:'25%'
    }
   
  }
  
  
  export default Upcoming;