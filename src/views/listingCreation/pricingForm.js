import React from "react";
import { Container,Row,Col,FormControl,Button,Form,Breadcrumb } from "react-bootstrap";
import Tile from "../../components/tile";
import {NavLink} from 'react-router-dom';

const ProductInfoForm = () => {
  
  return (
    <Container>

    <div style={styles.spacer80}></div>


      <Row>
        <h1>
          How Will You Charge Your Customers ?
        </h1>
      </Row>

      <div style={styles.spacer20}></div>


      <Form>
        <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
            <Form.Label>Base Cost</Form.Label>
            <Form.Control placeholder="100.00" />
        </Form.Group>

        <div style={styles.spacer20}></div>

        <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
            <Form.Label>Single Unit</Form.Label>
            <Form.Control placeholder="Single Unit" />
        </Form.Group>

        <div style={styles.spacer20}></div>

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