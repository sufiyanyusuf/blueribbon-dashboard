import React,{useEffect} from "react";
import { Container,Row,Col,Button } from "react-bootstrap";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId} from 'react-google-places-autocomplete';
import loadGooglePlaces from '../../utils/loadGooglePlaces';
import Map from '../../components/map';
import GoogleMap from '../../components/googleMaps';
import {StateContext,DispatchContext} from '../../redux/contexts';
import Actions from '../../redux/actions';
import { getServiceAreas, searchServiceAreas, updateServiceAreas } from '../../utils/Api'
import AsyncSelect from 'react-select/async';

const LocationForm = () => {
    
    const state = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);

    useEffect (()=>{
        const fetchAreas = async() => {
            try {
                let token = state.accessToken
                let serviceAreas = await getServiceAreas(token, state.currentListing.id)
                
                const areas = serviceAreas.map(area => {
                    return {
                        label:area.label,
                        value:area.data_id,
                        data_id:area.data_id,
                        polygon:area.polygon.data
                    }
                });  
    
                if (JSON.stringify(areas)!==JSON.stringify(state.currentServiceAreas)){
                    dispatch({ type: Actions.serviceAreas.updateServiceAreas, areas:areas});
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAreas()
    })

    const getPolygonsFromState = () => {
        const polygons = state.currentServiceAreas.map ((area)=>{
            return area.polygon
        })
        return polygons
    }

    const loadSearchOptions = async (inputValue, callback) => {
        if (!inputValue) {
            return callback([]);
        }
        
        try {
            let token = state.accessToken
            let results = await searchServiceAreas(token, inputValue)
            callback (results.areas);
        } catch (error) {
            console.log(error);
        }

        
    };

    const handleChange = async (selectedOptions) => {
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
        
        if (state.currentListing.id !== '') {
            
            try {
                let token = state.accessToken
                let params = {
                    areas:_selectedAreas,
                    listing_id: state.currentListing.id
                }
                let updatedAreas = await updateServiceAreas(token, params)
                dispatch({ type: Actions.serviceAreas.updateServiceAreas, areas:_selectedAreas});
            } catch (error) {
                console.log(error)
            }


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
                        value={state.currentServiceAreas}
                        loadOptions={loadSearchOptions} 
                        isMulti
                        autoFocus = {state.currentServiceAreas.length == 0}
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