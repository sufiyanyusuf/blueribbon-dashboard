import React,{useState} from "react";
import { Container,Row,Col,Button } from "react-bootstrap";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId} from 'react-google-places-autocomplete';
import loadGooglePlaces from '../../utils/loadGooglePlaces';
import Map from '../../components/map';

const getLatLong = (id) => {
    console.log(id)
    // geocodeByPlaceId(id)
    // .then(results => console.log(results))
    // .catch(error => console.error(error));
};


const LocationForm = () => {

    const removeArea = (obj)=>{
        console.log("remove");
        var _areas = areas.filter(x => {
            return x.id != obj.id;
          });
        updateAreas(_areas);
    };

    function AreaList() {
        const listItems = areas.map((area) =>
            <li key= {area.id}> {area.description}
                <Button onClick = {() => removeArea(area)}>Remove</Button>
            </li>
        );
        return (
            listItems
        );
    }

    loadGooglePlaces(); 

    const [areas,updateAreas] = useState([]);

    return (
        <Container fluid={true}>
            <Row>
                <Col md={{ span: 4, offset: 1 }}>
                    <div style={styles.spacer80}></div>
                    <h1 style={styles.leftAlign}>Where Will You Deliver ?</h1>

                    <div style={styles.spacer40}></div>
                    <div>
                        <GooglePlacesAutocomplete
                            placeholder={'Enter Area'}  
                            autocompletionRequest = {{
                                types: ["(regions)"]
                            }}
                            onSelect={(obj) => (
                                updateAreas(areas.concat([obj]))
                            )}
                            debounce={500}
                        />
                    </div>
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