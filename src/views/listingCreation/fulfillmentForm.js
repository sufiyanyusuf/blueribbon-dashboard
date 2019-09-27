import React from "react";
import { Container,Row,Col,FormControl,Button,Form,Breadcrumb } from "react-bootstrap";
import Tile from "../../components/tile";
import {NavLink} from 'react-router-dom';

const FulfillmentForm = () => {
  
  return (
    <Container>

    <div style={styles.spacer80}></div>


    <Row>
    <h1>
        The Last Step...
    </h1>
    </Row>

    <div style={styles.spacer20}></div>


    <Form>
        <Row>
            <Col>
                <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                    <Form.Label>Cancellation Buffer (Hours)</Form.Label>
                    <Form.Control placeholder="24" />
                </Form.Group>
            </Col>
        </Row>

        <div style={styles.spacer20}></div>

        <Row>
            <Col>
                <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                    <Form.Label>Customer Support Number</Form.Label>
                    <Form.Control placeholder="+971 " />
                </Form.Group>
            </Col>
        </Row>

        <div style={styles.spacer20}></div>

        <Row>
            <Col>
                <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                    <Form.Label>Cost Per Delivery</Form.Label>
                    <Form.Control placeholder="0.00" />
                </Form.Group>
            </Col>
        </Row>

        <div style={styles.spacer20}></div>
        
        <Row>
            <Col>
            <Form.Group controlId="mandatory">
                <Form.Check type="checkbox" label="Recipient's Presence Required" />
            </Form.Group>
            </Col>
        </Row>

        <div style={styles.spacer20}></div>

      </Form>

      <div style={styles.spacer80}></div>
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
  }
}


export default FulfillmentForm;