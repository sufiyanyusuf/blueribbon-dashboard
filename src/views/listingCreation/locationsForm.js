import React,{useEffect} from "react";
import { Container,Row,Col,Button } from "react-bootstrap";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId} from 'react-google-places-autocomplete';
import loadGooglePlaces from '../../utils/loadGooglePlaces';
import Map from '../../components/map';
import GoogleMap from '../../components/googleMaps';
import {StateContext,DispatchContext} from '../../redux/contexts';
import Actions from '../../redux/actions';
import Api from '../../utils/endpoints';
import axios from 'axios';
import AsyncSelect from 'react-select/async';

const LocationForm = () => {
    
    const globalState = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);

    useEffect (()=>{
    
        axios.get(Api(globalState.currentListing.id).getServiceAreas)
      .then(res => {
        const areas = res.data.map(area => {
            return {
                label:area.label,
                value:area.data_id,
                data_id:area.data_id,
                polygon:area.polygon.data
            }
        });  

        if (JSON.stringify(areas)!==JSON.stringify(globalState.currentServiceAreas)){
            dispatch({ type: Actions.serviceAreas.updateServiceAreas, areas:areas});
        }

      })
    })

    const getPolygonsFromState = () => {
        const polygons = globalState.currentServiceAreas.map ((area)=>{
            return area.polygon
        })
        return polygons
    }

    const loadSearchOptions = (inputValue, callback) => {
        if (!inputValue) {
            return callback([]);
        }
        
        axios.get(Api(inputValue).searchServiceAreas)
        .then(res => {
            const results = res.data;
            callback (results.areas);
        })
        .catch(function (error) {
            console.log(error);
        })
        
    };

    const handleChange = (selectedOptions) => {
        //update state when a search result gets selected
        var _selectedAreas = []
        
        if (selectedOptions) {
            _selectedAreas = selectedOptions.map((option)=>{
                return {
                    label:option.label,
                    value:option.data_id,
                    data_id:option.data_id,
                    polygon:option.polygon
                }
            })
            
        }
        
        if (globalState.currentListing.id !== ''){
            axios.post(Api().updateServiceAreas, {
                areas:_selectedAreas,
                listing_id:globalState.currentListing.id
            }).then(res =>{
                if (res.status == 200){
                    dispatch({ type: Actions.serviceAreas.updateServiceAreas, areas:_selectedAreas});
                }else{
                    console.log('error')
                }
                //show feedback toast
            });
        }
    }

    return (
        <Container fluid={true}>
            <Row>
                <Col md={{ span: 4, offset: 1 }}>
                    <div style={styles.spacer80}></div>
                    <h1 style={styles.leftAlign}>Where Will You Deliver ?</h1>
                    <div style={styles.spacer40}></div>
                    <AsyncSelect 
                        cacheOptions 
                        value={globalState.currentServiceAreas}
                        loadOptions={loadSearchOptions} 
                        isMulti
                        autoFocus = {globalState.currentServiceAreas.length == 0}
                        onChange={handleChange}
                    />
                   
                    {/* <AreaList/> */}
 
                </Col>

                <Col md={{ span: 6, offset: 1 }}>
                    {/* <Map/> */}
                    <GoogleMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBe12m5Dr_Nl4Npazinei3sQoJKr3MbuuY&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `92vh` }} />}
                        mapElement={<div style={{ height: `92vh` }} />}
                        selectedAreas = {getPolygonsFromState()}
                    />

                </Col>
            </Row>
        </Container>
    );
};

let styles = {
    leftAlign:{
        textAlign:"left"
    },
    spacer80:{
        height:80,
        width:80  
    },
    spacer20:{
        height:20,
        width:20  
    },
    spacer40:{
        height:40,
        width:40  
    },
    table:{
        textAlign:"left"
    }
}


export default LocationForm;