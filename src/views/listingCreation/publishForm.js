import React from "react";
import { Container,Row,Col,Button,Form,DropdownButton,Dropdown } from "react-bootstrap";

const PublishForm = () => {
  
    return (
      <Container>
  
      <div style={styles.spacer80}></div>
  
  
      <Row>
      <h1>
          Lift Off ...
      </h1>
      </Row>
  
      <div style={styles.spacer20}></div>
  
  
      <Form>
          <Row>
              <Col>
                  <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                      <Form.Label>Deep link</Form.Label>
                      <Form.Control disabled placeholder="bit.ly/loreal/490430" />
                  </Form.Group>
              </Col>
          </Row>
  
          <div style={styles.spacer20}></div>
  
          <Row>
              <Col>
                    <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                        <DropdownButton id="dropdown-item-button" split title="Listing Status" onSelect={function(evt){console.log(evt)}}>
                            <Dropdown.Item eventKey="1">LIVE</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Draft</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Archived</Dropdown.Item>
                        </DropdownButton>
                    </Form.Group>
              </Col>
          </Row>
  
         
  
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
  
  
  export default PublishForm;