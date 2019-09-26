import React,{useEffect,useRef} from "react";
import { Container,Row,Col,FormControl,Button,Form,Breadcrumb } from "react-bootstrap";
import Tile from "../../components/tile";
import {NavLink} from 'react-router-dom';
import {StateContext,DispatchContext} from '../../redux/contexts';
import Actions from '../../redux/actions';
import axios from 'axios';
import Api from '../../utils/endpoints';

const ProductInfoForm = () => {
  
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const titleRef = useRef(null);
  const unitRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (state.currentListing.id !== ''){
      axios.get(Api(state.currentListing.id).getProductInfo)
      .then(res => {
        let productInfo = {
          id:res.data.id,
          title: res.data.title,
          description:res.data.description, 
          unit:res.data.unit_title,
          type:res.data.type,
          listing_id:res.data.listing_id
        }
        if (state.currentProductInfo.id !== productInfo.id){
          dispatch({type:Actions.productInfo.updateProductInfo,productInfo:productInfo});
        }
        });
    }
  
  });

  const updateTitle = () => {
    console.log(state);
    let title = titleRef.current.value;
    if (state.currentProductInfo.title != title) {
      dispatch({ type: Actions.productInfo.updateTitle, title:title});
      console.log('updated title',state.currentProductInfo.title);
    }
  };

  const updateUnit = () => {
    let unit = unitRef.current.value;
    if (state.currentProductInfo.unit != unit) {
      dispatch({ type: Actions.productInfo.updateUnit, unit:unit});
      console.log('updated unit',state.currentProductInfo.unit);
    }
  };

  const updateDescription = () => {
    let description = descriptionRef.current.value;
    if (state.currentProductInfo.description != description) {
      dispatch({ type: Actions.productInfo.updateDescription, description:description});
      console.log('updated description',state.currentProductInfo.description);
    }
  };
  console.log(state.currentProductInfo);
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
            <Form.Control placeholder="Subscription Title" value={state.currentProductInfo.title || ''} ref={titleRef} onChange = {updateTitle}/>
        </Form.Group>

        <div style={styles.spacer20}></div>

        <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
            <Form.Label>Single Unit</Form.Label>
            <Form.Control placeholder="Single Unit" value={state.currentProductInfo.unit || ''} ref={unitRef} onChange = {updateUnit}/>
        </Form.Group>

        <div style={styles.spacer20}></div>

        <Form.Group controlId="exampleForm.ControlTextarea1" style = {{textAlign:"left"}}>
            <Form.Label>Product Description</Form.Label>
            <Form.Control as="textarea" rows="3" placeholder="Description for the Product" value={state.currentProductInfo.description || ''} ref={descriptionRef} onChange = {updateDescription}/>
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