import React, {useRef} from "react";
import { Container,Row,Col,FormControl,Button,Form,Breadcrumb } from "react-bootstrap";

const NewStepperForm = (props) => {

  const modifierTitle = useRef(null);
  const modifierPrompt = useRef(null);
  const minValue = useRef(0);
  const maxValue = useRef(null);
  const pricePerUnit= useRef(0);
  const modifierType = useRef(null);
  
  return (
    <Container>

      <div style={styles.spacer80}></div>

      <Row>
        <h2>
          About This Stepper
        </h2>
      </Row>

      <div style={styles.spacer20}></div>

        <Form>

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

            <div style={styles.spacer80}></div>

            <Row>
              <h2>
                Range
              </h2>
            </Row>

            <div style={styles.spacer20}></div>

            <Row>
              <Col>
                <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                    <Form.Label>Minimum Value (Default)</Form.Label>
                    <Form.Control placeholder="1" ref={minValue}/>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                    <Form.Label>Maximum Value</Form.Label>
                    <Form.Control placeholder="10" ref={maxValue}/>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                    <Form.Label>Price Per Unit</Form.Label>
                    <Form.Control placeholder="0" ref={pricePerUnit}/>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Button onClick = { () => {props.addModifier({
                title:modifierTitle.current.value,
                prompt:modifierPrompt.current.value,
                minValue:minValue.current.value,
                maxValue:maxValue.current.value,
                pricePerUnit:pricePerUnit.current.value,
                type:modifierType.current.value,
                element:"Stepper"
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

export default NewStepperForm;