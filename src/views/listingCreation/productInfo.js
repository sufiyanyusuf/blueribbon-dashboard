import React from "react";
import { Container,Row,Col,FormControl,Button,Form } from "react-bootstrap";
import Tile from "../../components/tile";
import {NavLink} from 'react-router-dom';

const ProductInfoForm = () => {
  
  return (
    <Container>

    <div style={styles.spacer80}></div>
      <Row>
        <Col>
            <Tile icon="https://image.flaticon.com/icons/png/512/51/51057.png" title = "+ New Product" tilePressed = { () => { console.log('pressed') } }/>
         </Col>
        <Col>
            <Tile icon="https://image.flaticon.com/icons/png/512/51/51057.png" title = "+ New Service" tilePressed = { () => { console.log('pressed') } }/>
         </Col>
      </Row>
      <div style={styles.spacer80}></div>

      <Row>
        <h1>
          About Your Product
        </h1>
      </Row>

      <div style={styles.spacer20}></div>


      <Form>
        <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
            <Form.Label>Subscription Title</Form.Label>
            <Form.Control placeholder="Subscription Title" />
        </Form.Group>

        <div style={styles.spacer20}></div>

        <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
            <Form.Label>Single Unit</Form.Label>
            <Form.Control placeholder="Single Unit" />
        </Form.Group>

        <div style={styles.spacer20}></div>

        <Form.Group controlId="exampleForm.ControlTextarea1" style = {{textAlign:"left"}}>
            <Form.Label>Product Description</Form.Label>
            <Form.Control as="textarea" rows="3" />
        </Form.Group>

        <div style={styles.spacer20}></div>

        <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
            <Form.Label>Choose Image</Form.Label><br/>
            <input type="file" name="file"/>
        </Form.Group>

        <div style={styles.spacer20}></div>

        <Button variant="primary" type="submit">
            Submit
        </Button>
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


export default ProductInfoForm;