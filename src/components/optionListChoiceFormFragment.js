import React, {useRef} from "react";
import { Container,Row,Col,FormControl,Button,Form,Breadcrumb } from "react-bootstrap";

const OptionListChoiceFragment = (props) => {
    
    const choiceTitle = useRef(null);
    const pricingImpact = useRef(null);
    const choiceExplainer = useRef(null);
    const choiceIcon = useRef(null);
    const unitTitle = useRef(null);
    const unitValue = useRef(null);

    return (
        <div>
            <div style={styles.spacer20}></div>

            <Row>
            <Col>
                <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                    <Form.Label>Choice Title</Form.Label>
                    <Form.Control placeholder="Choice Title" ref={choiceTitle}/>
                </Form.Group>
            </Col>
            </Row>

            <div style={styles.spacer20}></div>

            <Row>
            <Col>
                <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                    <Form.Label>Pricing Impact</Form.Label>
                    <Form.Control placeholder="0.00" ref={pricingImpact}/>
                </Form.Group>
            </Col>
            </Row>

            <div style={styles.spacer20}></div>


            <Row>
            <Col>
                <Form.Group controlId="exampleForm.ControlTextarea1" style = {{textAlign:"left"}}>
                    <Form.Label>Explainer Text</Form.Label>
                    <Form.Control as="textarea" rows="3" ref={choiceExplainer}/>
                </Form.Group>
            </Col>
            </Row>


            <div style={styles.spacer20}></div>

            <Row>
              <Col>
                <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                    <Form.Label>Unit</Form.Label>
                    <Form.Control placeholder="Unit" ref={unitTitle}/>
                </Form.Group>
              </Col>
            </Row>

            <div style={styles.spacer20}></div>

            <Row>
              <Col>
                <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
                    <Form.Label>Value</Form.Label>
                    <Form.Control placeholder="Value" ref={unitValue}/>
                </Form.Group>
              </Col>
            </Row>

            <div style={styles.spacer20}></div>

            <Button onClick = { () => {props.addChoice({
              title:choiceTitle.current.value,
              pricing:pricingImpact.current.value,
              explainer:choiceExplainer.current.value,
              unit:unitTitle.current.value,
              value:unitValue.current.value,
              })} 
            }>
                Add Choice
            </Button>


            <div style={styles.spacer80}></div>

        </div>
    )

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
    textAlign:{
      textAlign:"left"
    }
  }
export default OptionListChoiceFragment;