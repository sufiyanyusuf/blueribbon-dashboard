import React,{useState,useEffect} from "react";
import { Container,Row,Col,Modal,Button} from "react-bootstrap";
import Tile from "../../components/tile";
import {NavLink} from 'react-router-dom';
import ListHeader from "../../components/modifierListHeader";
import ListItem from "../../components/modifierListItem";
import NewOptionListForm from "../../views/modifierCreation/newOptionListForm";
import NewCarouselForm from "../../views/modifierCreation/newCarouselForm";
import NewStepperForm from "../../views/modifierCreation/newStepperForm";
import NewTextfieldForm from "../../views/modifierCreation/newTextfieldForm";

import {StateContext,DispatchContext} from '../../redux/contexts';
import Actions from '../../redux/actions';
import { getModifiers,createModifier,removeModifier } from '../../utils/Api'

const ModifierForm = () => {  

    const [showOptionListForm, setOptionListFormVisible] = useState(false);
    const [showCarouselForm, setCarouselFormVisible] = useState(false);
    const [showStepperForm, setStepperFormVisible] = useState(false);
    const [showTextfieldForm, setTextfieldFormVisible] = useState(false);

    const state = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);

    useEffect(() => {
        // Fetch lists
        fetchModifiers()
    });

    const fetchModifiers = async() => {

        try {
            let token = state.accessToken
            let params = state.currentListing.id
            let modifiers = await getModifiers(token, params)
            let _modifiers = modifiers.map((modifier) => {
                return {
                    key: modifier.id,
                    title: modifier.title,
                    element: modifier.element_type,
                    type: modifier.type,
                    default: modifier.default,
                    order: modifier.order
                }
            });

            //check for change before dispatch
            if (JSON.stringify(_modifiers)!==JSON.stringify(state.currentModifiers)){
                dispatch({ type: Actions.modifier.setModifiers, modifiers:_modifiers});
            }
            
        } catch (error) {
            
        }

    }

    function ModifierList(props) {
        const items = props.items;
        const listItems = items.map((item) => 
          <ListItem key= {item.key} item={item} selected={()=>console.log("clicked",item.key)} remove={props.remove}/>
        );
        return (
            listItems
        );
    }

    // const defaultModifiers = [{key:1,order:"1",title:"title",element:"element",type:"type",default:"default"},{key:2,order:"2",title:"title",element:"element",type:"type",default:"default"}];
    // const [modifiers, updateModifierList] = useState(defaultModifiers);

    const addModifier = async (obj) => {

        setTextfieldFormVisible(false);
        setStepperFormVisible(false);
        setCarouselFormVisible(false);
        setOptionListFormVisible(false);
        
        try {
            let token = state.accessToken
            let params = {

                title:obj.title,
                listing_id:state.currentListing.id,
                description:obj.prompt,
                type:obj.type,
                element_type:obj.element,
                order: state.currentModifiers.length + 1,
  
                mandatory:obj.mandatory,
  
                maxValue:obj.maxValue,
                minValue:obj.minValue,
                price_multiplier:obj.pricePerUnit,
                unit:obj.unit,
                placeholder:obj.placeholder,
  
                choices:obj.choices,
                
            }

            let modifier = await createModifier(token, params)
            fetchModifiers()

        } catch (error) {
            
        }

        
    }

    const deleteModifier = async (obj) => {

        try {
            let token = state.accessToken
            let params = obj.key
            let removedModifier = await removeModifier(token,params)
            fetchModifiers()
        } catch (error) {
            console.log(error)
        }

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
                <Button onClick={() => setCarouselFormVisible(false)}>Cancel</Button>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    <Row>
                        <Col md={{ span: 8, offset: 1 }}>
                                <NewCarouselForm addModifier={addModifier} accessToken={state.accessToken}/>
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
                <Tile icon="Checklist.svg" title = "New Option List" tilePressed = { () => { setOptionListFormVisible(true) } }/>
            </Col>
            <Col>
                <Tile icon="Carousel.svg" title = "New Carousel" tilePressed = { () => { setCarouselFormVisible(true) } }/>
            </Col>
            <Col>
                <Tile icon="Stepper.svg" title = "New Stepper" tilePressed = { () => { setStepperFormVisible(true) } }/>
            </Col>
            <Col>
                <Tile icon="Textfield.svg" title = "New Textfield" tilePressed = { () => { setTextfieldFormVisible(true) } }/>
            </Col>
        </Row>
        <div style={styles.spacer80}></div>


        <div style = {styles.leftTextAlign}>
            <ListHeader/>
            <ModifierList items={state.currentModifiers} remove = {deleteModifier}/>
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