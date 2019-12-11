import React, {useState,useEffect} from "react";
import { Container,Row,Col,Button,Form,DropdownButton,Dropdown,ButtonGroup } from "react-bootstrap";
import {StateContext,DispatchContext} from '../../redux/contexts';
import { getListingDeeplink,updateListingStatus } from '../../utils/Api' 

import Actions from '../../redux/actions';

const PublishForm = () => {

    const state = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);

    const [variant,setVariant]=useState("warning");
    const [deepLink,setDeeplink] = useState('...');

    useEffect(()=>{
        const status = state.currentListing.status
        updateBadgeType(status)

        const getLink = async () => {
     
            if (state.currentListing.id !== '') {
                try {
                    let token = state.accessToken
                    let params = state.currentListing.id
                    let link = await getListingDeeplink(token, params)
                    setDeeplink(link)
                } catch (e) {
                    console.log(e)
                }
            }
        }
        getLink()
    },[])

    const updateBadgeType = (status) => {
        if (status){

            switch (status.toLowerCase()){
                case "draft":
                    setVariant("warning")
                    break
                case "live":
                    setVariant("success")
                    break
                case "archived":
                    setVariant("danger")
                    break
                default:
                    setVariant("warning")
            }

        }
    }

    const changeListingStatus = async (status) => {
        
        if (state.currentListing.id !== '') {
            try {
                let params = {
                    listing_id: state.currentListing.id,
                    status: status
                }
                let token = state.accessToken
                let res = await updateListingStatus (token, params)
                updateBadgeType(status);
                dispatch({type: Actions.listing.updateCurrentListingStatus, status:status});
                
            } catch (e) {
                console.log(e)
            }

        }
    }

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
                      <Form.Control disabled value={deepLink} />
                  </Form.Group>
              </Col>
          </Row>
  
          <div style={styles.spacer20}></div>
  
          <Row>
              <Col>
                    <Form.Group controlId="formBasic"  style = {{textAlign:"left"}}>
                        <DropdownButton id="dropdown-item-button" variant={variant} split title={"Status : "+state.currentListing.status} onSelect={changeListingStatus}>
                            <Dropdown.Item eventKey="Draft">Draft</Dropdown.Item>
                            <Dropdown.Item eventKey="LIVE">LIVE</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="Archived">Archived</Dropdown.Item>
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