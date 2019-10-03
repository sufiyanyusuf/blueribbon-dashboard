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
import Autocomplete from 'react-autocomplete';

const LocationForm = () => {

    const [searchLoader,setLoader] = useState(false);
    const [areas,updateAreas] = useState([]);
    const [searchResults,setSearchResults] = useState([]);
    const [searchQuery,setQuery] = useState([]);
    const globalState = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);

    console.log(searchResults);

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


    const handleSearch = (query) => {
        console.log(query.length)
        if (query.length > 3) {
            console.log(query.length)
            setLoader(true)
            axios.get(Api(query).searchServiceAreas)
            .then(res => {
                setLoader(false)
                const results = res.data;
                //add check for null
                setSearchResults(results);
            })
        }
    }


    return (
        <Container fluid={true}>
            <Row>
                <Col md={{ span: 4, offset: 1 }}>
                    <div style={styles.spacer80}></div>
                    <h1 style={styles.leftAlign}>Where Will You Deliver ?</h1>
                    <div style={styles.spacer40}></div>

                    <Autocomplete
                        inputProps={{ id: 'location-searchbox' }}
                        // wrapperStyle={{ position: 'relative', display: 'inline-block' }}
                        value={searchQuery}
                        items={searchResults}
                        getItemValue={(item) => item.properties.NAME_3}
                        onSelect={(value, item) => {
                            updateAreas(areas.concat([item]))
                        }}
                        onChange={(event, value) => {
                            setQuery(value);
                            handleSearch(value)
                        }}
                        renderMenu={children => (
                            <div className="menu">
                                {children}
                            </div>
                        )}
                        renderItem={(item, isHighlighted) => (
                            <div
                                className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                                key={item.id}
                            >{item.properties.NAME_3}
                            </div>
                        )}
                    />

                    <AreaList/>

                    
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