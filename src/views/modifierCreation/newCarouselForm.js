import React,{useState,useRef} from "react";
import { Container,Row,Col,FormControl,Button,Form,Breadcrumb } from "react-bootstrap";
import CarouselChoiceFragment from '../../components/carouselChoiceFormFragment';
import ListItem from '../../components/carouselChoicesListItem';

const NewCarouselForm = (props) => {

  const [choiceList,addToChoiceList] = useState([]);
  const modifierTitle = useRef(null);
  const modifierPrompt = useRef(null);
  const modifierMandatory = useRef(null);
  const modifierMultiSelect = useRef(null);
  const modifierType = useRef(null);

  const addChoice = (obj) => {
    
    addToChoiceList(choiceList.concat([{
      key:choiceList.length+1,
      order:choiceList.length+1,
      title:obj.title, 
      pricing_impact:obj.pricing,
      explainer:obj.explainer,
      icon:obj.icon 
    }]))
        
  }

  function ChoiceList() {
    const items = choiceList;
    const listItems = items.map((item) => 
      <ListItem key= {item.key} item={item} selected={()=>console.log("clicked",item.key)}/>
    );
    return (
        listItems
    );
  }

  return (
    <Container>

      <div style={styles.spacer80}></div>

      <Row>
        <h1>
          About This Carousel
        </h1>
      </Row>

      <div style={styles.spacer80}></div>

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

            <div style={styles.spacer20}></div>

            <Row>
              <Col>
                <Form.Group controlId="mandatory">
                  <Form.Check type="checkbox" label="Mandatory" ref={modifierMandatory}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="multiselection">
                  <Form.Check type="checkbox" label="MultiSelection" ref={modifierMultiSelect}/>
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
                <Form.Label>Select Type</Form.Label>
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
                Choices
              </h2>
            </Row>

            <CarouselChoiceFragment addChoice = {addChoice}/>

            <div style = {styles.leftTextAlign}>
              <ChoiceList/>
            </div>

            <div style={styles.spacer20}></div>

            <Row>
              <Button onClick = { () => {props.addModifier({
                title:modifierTitle.current.value,
                prompt:modifierPrompt.current.value,
                mandatory:modifierMandatory.current.checked,
                type:modifierType.current.value,
                element:"Carousel",
                choices:choiceList
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


export default NewCarouselForm;