import React from "react";
import { Container,Row,Col,FormControl,Button,Form,Breadcrumb } from "react-bootstrap";
import {NavLink} from 'react-router-dom';

const NewOptionListForm = () => {
  
   
  return (
    <Container>

      <div style={styles.spacer80}></div>


        <Form>

            <Row>
              <h2>
                About This List
              </h2>
            </Row>

            <div style={styles.spacer20}></div>

            <Row>
              <Col>
                <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                    <Form.Label>Modifier Title</Form.Label>
                    <Form.Control placeholder="Modifier Title" />
                </Form.Group>
              </Col>
            </Row>

            <div style={styles.spacer20}></div>

            <Row>
              <Col>
                <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                    <Form.Label>Modifier Prompt</Form.Label>
                    <Form.Control placeholder="Modifier Prompt" />
                </Form.Group>
              </Col>
            </Row>

            <div style={styles.spacer20}></div>

            <Row>
              <Col>
                <Form.Group controlId="mandatory">
                  <Form.Check type="checkbox" label="Mandatory" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="multiselection">
                  <Form.Check type="checkbox" label="MultiSelection" />
                </Form.Group>
              </Col>
            </Row>
            
            <div style={styles.spacer80}></div>

            <Row>
              <h2>
                Select Modifier Type
              </h2>
            </Row>

            <div style={styles.spacer20}></div>

            <Row>
              <Col>
                <Form.Group controlId="type-product">
                  <Form.Check type="checkbox" label="Product Spec" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="type-delivery">
                  <Form.Check type="checkbox" label="Delivery" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="type-subscription">
                  <Form.Check type="checkbox" label="Subscription" />
                </Form.Group>
              </Col>
            </Row>

            <div style={styles.spacer80}></div>

            <Row>
              <h2>
                Choices
              </h2>
            </Row>

            <div style={styles.spacer20}></div>

            <Row>
              <Col>
                <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                    <Form.Label>Choice Title</Form.Label>
                    <Form.Control placeholder="Modifier Title" />
                </Form.Group>
              </Col>
            </Row>

            <div style={styles.spacer20}></div>

            <Row>
              <Col>
                <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                    <Form.Label>Pricing Impact</Form.Label>
                    <Form.Control placeholder="0.00" />
                </Form.Group>
              </Col>
            </Row>

            <div style={styles.spacer20}></div>


            <Row>
              <Col>
                <Form.Group controlId="exampleForm.ControlTextarea1" style = {{textAlign:"left"}}>
                    <Form.Label>Explainer Text</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
              </Col>
            </Row>


            <div style={styles.spacer20}></div>

            <Button variant="primary">
                Add Choice
            </Button>

            <div style={styles.spacer80}></div>
            
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


export default NewOptionListForm;