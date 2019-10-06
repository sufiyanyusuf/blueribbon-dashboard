import React,{useState} from "react";
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

    const getPolygons = (areas) => {
        const polygons = areas.map((area)=>{
            return area.geometry.coordinates[0][0]
        })

        var gPolygonArray = polygons.map (coordinateSet => {
            return coordinateSet.map(coordinate => {
                return {lat:coordinate[1],lng:coordinate[0]}
            })
        })

        return gPolygonArray

    };

    const getPolygonsFromState = () => {
        const polygons = globalState.currentServiceAreas.map ((area)=>{
            return area.polygon
        })
        return polygons
    }

    const loadOptions = (inputValue, callback) => {

        if (inputValue.length > 3) {
            axios.get(Api(inputValue).searchServiceAreas)
            .then(res => {
                const results = res.data;
                // console.log(results)
                const viewModel = results.map((result)=>{
                    if (result.properties.NAME_3){
                        return {id:result.id,value:result.id,label:result.properties.NAME_3,properties:result.properties,geometry:result.geometry}
                    }else if (result.properties.NAME_2){
                        return {id:result.id,value:result.id,label:result.properties.NAME_2,properties:result.properties,geometry:result.geometry}
                    }else{
                        return {id:result.id,value:result.id,label:result.properties.NAME_1,properties:result.properties,geometry:result.geometry}
                    }
                })
                // console.log(viewModel)
                callback (viewModel);
            })
        }else{
            callback([]);
        }

    };

    const handleChange = (selectedOptions) => {

        const gPolygonArray = getPolygons(selectedOptions);

        const _selectedAreas = selectedOptions.map((option,index)=>{
            return {
                label:option.label,
                data_id:option.id,
                polygon:gPolygonArray[index],
                listing:globalState.currentListing.id,
            }
        })
        
        dispatch({ type: Actions.serviceAreas.updateServiceAreas, areas:_selectedAreas});
        console.log(_selectedAreas)

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
                        defaultValue={globalState.currentServiceAreas}
                        loadOptions={loadOptions} 
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