import React,{useState} from "react";
import { Container,Row,Col,Button } from "react-bootstrap";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId} from 'react-google-places-autocomplete';
import loadGooglePlaces from '../../utils/loadGooglePlaces';
import Map from '../../components/map';
import {StateContext,DispatchContext} from '../../redux/contexts';
import Actions from '../../redux/actions';
import Api from '../../utils/endpoints';
import axios from 'axios';
import AsyncSelect from 'react-select/async';

const LocationForm = () => {
    
    const [searchLoader,setLoader] = useState(false);
    const [areas,updateAreas] = useState([]);
    const [selectedAreas, setSelectedAreas] = useState([]);
    const globalState = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);

    const removeArea = (obj)=>{
        console.log("remove");
        var _areas = areas.filter(x => {
            return x.id != obj.id;
          });
        updateAreas(_areas);
    };

    function AreaList() {
        const listItems = areas.map((area) =>
            <li key= {area.id}> {area.properties.NAME_3}
                <Button onClick = {() => removeArea(area)}>Remove</Button>
            </li>
        );
        return (
            listItems
        );
    }

    const loadOptions = (inputValue, callback) => {

        if (inputValue.length > 3) {
            axios.get(Api(inputValue).searchServiceAreas)
            .then(res => {
                const results = res.data;
                console.log(results)
                const viewModel = results.map((result)=>{
                    if (result.properties.NAME_3){
                        return {id:result.id,value:result.id,label:result.properties.NAME_3,properties:result.properties}
                    }else if (result.properties.NAME_2){
                        return {id:result.id,value:result.id,label:result.properties.NAME_2,properties:result.properties}
                    }else{
                        return {id:result.id,value:result.id,label:result.properties.NAME_1,properties:result.properties}
                    }
                })
                setSelectedAreas(viewModel);
                callback (viewModel);
            })
        }else{
            setSelectedAreas([]);
            callback([]);
        }

    };

    const handleChange = (selectedOptions) => {
        console.log(selectedOptions)
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
                        loadOptions={loadOptions} 
                        isMulti
                        autoFocus = {true}
                        onChange={handleChange}
                    />
                   
                    {/* <AreaList/> */}
 
                </Col>

                <Col md={{ span: 6, offset: 1 }}>
                    <Map/>
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