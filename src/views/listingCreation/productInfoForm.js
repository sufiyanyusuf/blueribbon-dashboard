import React,{useEffect,useRef} from "react";
import { Container,Row,Col,FormControl,Button,Form,Breadcrumb } from "react-bootstrap";
import Tile from "../../components/tile";
import {StateContext,DispatchContext} from '../../redux/contexts';
import Actions from '../../redux/actions';
import axios from 'axios';
import Api from '../../utils/endpoints';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const ProductInfoForm = () => {

  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const basePriceRef = useRef (null);
  const currencyRef = useRef (null);
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
          currency:res.data.currency,
          basePrice:res.data.base_price,
          listing_id:res.data.listing_id
        }
        if (state.currentProductInfo.id !== productInfo.id){
          dispatch({type:Actions.productInfo.updateProductInfo,productInfo:productInfo});
        }
        });
    }
  
  });

  const updateTypeAsProduct = (status) => {
    dispatch({ type: Actions.productInfo.updateType, subType:'product'});
    console.log('updated type',state.currentProductInfo.type);  
  };

  const updateTypeAsService = (status) => {
    dispatch({ type: Actions.productInfo.updateType, subType:'service'});
    console.log('updated type',state.currentProductInfo.type);  
  };

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

  const updateBasePrice = () => {
    let basePrice = basePriceRef.current.value;
    if (state.currentProductInfo.basePrice != basePrice) {
      dispatch({ type: Actions.productInfo.updateBasePrice, basePrice:basePrice});
      console.log('updated base price',state.currentProductInfo.basePrice);
    }
  };

  const updateCurrency = () => {
    let currency = currencyRef.current.value;
    if (state.currentProductInfo.currency != currency) {
      dispatch({ type: Actions.productInfo.updateCurrency, currency:currency});
      console.log('updated currency',state.currentProductInfo.currency);
    }
  };

  const updateDescription = () => {
    let description = descriptionRef.current.value;
    if (state.currentProductInfo.description != description) {
      dispatch({ type: Actions.productInfo.updateDescription, description:description});
      console.log('updated description',state.currentProductInfo.description);
    }
  };

  const getUploadParams = async () => {
    return { url: Api().uploadProductImage }
  }

  const handleChangeStatus = ({ xhr,meta, remove }, status) => {
    if (status === 'headers_received') {

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.responseText);
          dispatch({type:Actions.productInfo.updateImageUrl,imageUrl:xhr.responseText});
        }
      }
      
      remove()
    } else if (status === 'aborted') {
    }
  }

  
  return (
    <Container>

    <div style={styles.spacer80}></div>
      <Row>
        <Col>
            <Tile icon="Product.svg" title = "+ New Product" tilePressed = { updateTypeAsProduct } selected = {(state.currentProductInfo.type && state.currentProductInfo.type === 'product')} />
         </Col>
        <Col>
            <Tile icon="Service.svg" title = "+ New Service" tilePressed = { updateTypeAsService } selected = {(state.currentProductInfo.type && state.currentProductInfo.type === 'service')}/>
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
          <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            maxFiles={1}
            multiple={false}
            canCancel={true}
            inputContent="Drop A File"
            styles={{
              dropzoneActive: { borderColor: 'blue' },
            }}
          />

        </Form.Group>

        <div style={styles.spacer20}></div>

        <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
            <Form.Label>Base Price</Form.Label>
            <Form.Control placeholder="Base Price" value={state.currentProductInfo.basePrice || ''} ref={basePriceRef} onChange = {updateBasePrice}/>
        </Form.Group>

        <div style={styles.spacer20}></div>

        <Form.Group controlId="formBasic" style = {{textAlign:"left"}}>
            <Form.Label>Currency</Form.Label>
            <Form.Control placeholder="Currency" value={state.currentProductInfo.currency || ''} ref={currencyRef} onChange = {updateCurrency}/>
        </Form.Group>

        <div style={styles.spacer20}></div>
          
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