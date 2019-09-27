import React, {useRef} from "react";
import { Container,Row,Col,FormControl,Button,Form } from "react-bootstrap";

const NewTextfieldForm = (props) => {

  const modifierTitle = useRef(null);
  const modifierPrompt = useRef(null);
  const modifierMandatory = useRef(null);
  const modifierType = useRef(null);
  const modifierPlaceholder = useRef(null);
  return (
    
    <Container>
      <div style={styles.spacer80}></div>

      <Form>

          <Row>
            <h1>
              About This Textfield
            </h1>
          </Row>

          <div style={styles.spacer80}></div>

          <Row>
            <Col>
              <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                  <Form.Label>Modifier Title</Form.Label>
                  <Form.Control placeholder="Modifier Title" ref={modifierTitle}/>
              </Form.Group>
            </Col>
          </Row>

          <div style={styles.spacer20}></div>

          <Row>
            <Col>
              <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                  <Form.Label>Modifier Prompt</Form.Label>
                  <Form.Control placeholder="Modifier Prompt" ref={modifierPrompt}/>
              </Form.Group>
            </Col>
          </Row>

          <div style={styles.spacer20}></div>

          <Row>
            <Col>
              <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                  <Form.Label>Placeholder</Form.Label>
                  <Form.Control placeholder="Placeholder for textfield" ref={modifierPlaceholder}/>
              </Form.Group>
            </Col>
          </Row>

          <div style={styles.spacer20}></div>

          <Row>
            <Col>
              <Form.Group controlId="mandatory">
                <Form.Check type="checkbox" label="Mandatory" ref={modifierMandatory}/>
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
            <Form.Group controlId="exampleForm.ControlSelect">
              <Form.Label>Example select</Form.Label>
              <Form.Control as="select" ref={modifierType}>
                <option>None</option>
                <option>Product</option>
                <option>Subscription</option>
                <option>Delivery</option>
              </Form.Control>
            </Form.Group>
            </Col>
          </Row>

          <div style={styles.spacer20}></div>

          <Row>
            <Button onClick = { () => {props.addModifier({
              title:modifierTitle.current.value,
              prompt:modifierPrompt.current.value,
              mandatory:modifierMandatory.current.checked,
              type:modifierType.current.value,
              element:"Textfield",
              placeholder:modifierPlaceholder.current.value
              })} 
            }>Save & Close</Button>
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


export default NewTextfieldForm;