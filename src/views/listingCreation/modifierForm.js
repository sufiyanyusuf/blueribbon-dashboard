import React,{useState} from "react";
import { Container,Row,Col,Modal,Button} from "react-bootstrap";
import Tile from "../../components/tile";
import {NavLink} from 'react-router-dom';
import ListHeader from "../../components/modifierListHeader";
import ListItem from "../../components/modifierListItem";
import NewOptionListForm from "../../views/modifierCreation/newOptionListForm";
import NewCarouselForm from "../../views/modifierCreation/newCarouselForm";
import NewStepperForm from "../../views/modifierCreation/newStepperForm";
import NewTextfieldForm from "../../views/modifierCreation/newTextfieldForm";

const ModifierForm = () => {  

  const [showOptionListForm, setOptionListFormVisible] = useState(false);
  const [showCarouselForm, setCarouselFormVisible] = useState(false);
  const [showStepperForm, setStepperFormVisible] = useState(false);
  const [showTextfieldForm, setTextfieldFormVisible] = useState(false);

    function ModifierList(props) {
        const items = props.items;
        const listItems = items.map((item) => 
          <ListItem key= {item.key} item={item} selected={()=>console.log("clicked",item.key)}/>
        );
        return (
            listItems
        );
    }

    const defaultModifiers = [{key:1,order:"No",title:"title",element:"element",type:"type",default:"default"},{key:2,order:"No",title:"title",element:"element",type:"type",default:"default"}];
    const [modifiers, updateModifierList] = useState(defaultModifiers);

    const addModifier = (obj) => {
        
        setTextfieldFormVisible(false);
        setStepperFormVisible(false);
        setCarouselFormVisible(false);
        setOptionListFormVisible(false);
        
        updateModifierList(modifiers.concat([{
            key:modifiers.length+1,
            order:modifiers.length+1,
            title:obj.title, 
            element:obj.element,
            type:"type",
            default:""}]))
            
        console.log(obj)
    }


    return (
        <Container>

        <Modal
            size="xl"
            show={showOptionListForm}
            onHide={() => setOptionListFormVisible(false)}
        >
            <Modal.Header>
                <Modal.Title style={{paddingTop:10,paddingLeft:20}}>Create A List</Modal.Title>
                <Button onClick={() => setOptionListFormVisible(false)}>Cancel</Button>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    <Row>
                        <Col md={{ span: 8, offset: 1 }}>
                            <NewOptionListForm addModifier={addModifier}/>
                        </Col>
                    </Row>
                </Container>
        </Modal.Body>

        </Modal>

        <Modal
            size="xl"
            show={showCarouselForm}
            onHide={() => setCarouselFormVisible(false)}
        >
            <Modal.Header>
                <Modal.Title style={{paddingTop:10,paddingLeft:20}}>Create A Carousel</Modal.Title>
                <Button onClick={() => setCarouselFormVisible(false)}>Save & Close</Button>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    <Row>
                        <Col md={{ span: 8, offset: 1 }}>
                            <NewCarouselForm addModifier={addModifier}/>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>

        <Modal
            size="xl"
            show={showStepperForm}
            onHide={() => setStepperFormVisible(false)}
        >

            <Modal.Header>
                <Modal.Title style={{paddingTop:10,paddingLeft:20}}>Create A Counter</Modal.Title>
                <Button onClick={() => setStepperFormVisible(false)}>Cancel</Button>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    <Row>
                        <Col md={{ span: 8, offset: 1 }}>
                            <NewStepperForm addModifier={addModifier}/>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>

        <Modal
            size="xl"
            show={showTextfieldForm}
            onHide={() => setTextfieldFormVisible(false)}
        >
            <Modal.Header>
                <Modal.Title style={{paddingTop:10,paddingLeft:20}}>Create A Textbox</Modal.Title>
                <Button onClick={() => setTextfieldFormVisible(false)}>Cancel</Button>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    <Row>
                        <Col md={{ span: 8, offset: 1 }}>
                            <NewTextfieldForm addModifier={addModifier}/>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>

        </Modal>

        <div style={styles.spacer80}></div>

        <Row>
            <h1>
                Create A World Of Choices
            </h1>
        </Row>

        <div style={styles.spacer80}></div> 

        <Row>
            <Col>
                <Tile icon="https://image.flaticon.com/icons/png/512/51/51057.png" title = "New Option List" tilePressed = { () => { setOptionListFormVisible(true) } }/>
            </Col>
            <Col>
                <Tile icon="https://image.flaticon.com/icons/png/512/51/51057.png" title = "New Carousel" tilePressed = { () => { setCarouselFormVisible(true) } }/>
            </Col>
            <Col>
                <Tile icon="https://image.flaticon.com/icons/png/512/51/51057.png" title = "New Stepper" tilePressed = { () => { setStepperFormVisible(true) } }/>
            </Col>
            <Col>
                <Tile icon="https://image.flaticon.com/icons/png/512/51/51057.png" title = "New Textfield" tilePressed = { () => { setTextfieldFormVisible(true) } }/>
            </Col>
        </Row>
        <div style={styles.spacer80}></div>


        <div style = {styles.leftTextAlign}>
            <ListHeader/>
            <ModifierList items={modifiers} />
        </div>


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
  leftTextAlign:{
    textAlign:"left"
  }
}


export default ModifierForm;