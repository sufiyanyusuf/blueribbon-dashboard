// src/components/NavBar.js

import React from "react";
import { Link,Redirect } from "react-router-dom";
import { ReactComponent as Logo } from '../assets/img/monogram_color.svg';
import { useAuth0 } from "../react-auth0-wrapper";
import { Container,Row,Col,FormControl,Button,Image} from "react-bootstrap";


const LoginScreen = (location) => {

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { from } = location.state || { from: { pathname: '/' }};
  
  if (isAuthenticated === true) {
    return <Redirect to={from} />
  }

  return (
    <Container>

      <div style={styles.spacer80}></div>
      <Row>
        <Col>
          <Row>
              <Image src={require("../assets/img/monogram_color.svg")}/>
          </Row>
          <div style={styles.spacer80}></div>
          <Row>
              <h1 style = {styles.textAlign}>Welcome To BlueRibbon</h1>
              <h3 style = {styles.textAlign}>Please sign in to continue</h3>
          </Row>

          <div style={styles.spacer20}></div>

          <Row>
              <Button 
                  onClick={() =>
                  loginWithRedirect({})
              }>Sign In</Button>
          </Row>
        </Col>
        <Col>
          <Row>
            <Image src={require("../assets/img/business_shop.svg")} fluid/>
          </Row>
        </Col>
      </Row>
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
  textAlign:{
    textAlign:"left"
  },
  blueText:{
  
  }

}

export default LoginScreen;

