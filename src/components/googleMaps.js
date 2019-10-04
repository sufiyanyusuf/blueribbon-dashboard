import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polygon } from "react-google-maps"

    
      const renderRegions=(areas)=>{
        //get array of polygons

        const polygons = areas.map((area)=>{
            return area.geometry.coordinates[0][0]
        })

        var gPolygonArray = polygons.map (coordinateSet => {
            return coordinateSet.map(coordinate => {
                return {lat:coordinate[1],lng:coordinate[0]}
            })
        })

        return(
            gPolygonArray.map((gPolygon)=>{
                return (
                    <Polygon
                    path = {gPolygon}
                    options = {{
                        strokeColor:'#0A71F2',
                        strokeOpacity:1,
                        strokeWeight:2,
                        fillColor:'#0A71F2',
                        fillOpacity:0.5,
                    }}
                />
                )
            })
        )

    }

    const MapComponent = withScriptjs(withGoogleMap((props) => 
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 25.244701, lng: 55.2962462 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: 41, lng: 28 }} />}
      {props.selectedAreas &&  renderRegions(props.selectedAreas)}
  
    </GoogleMap>
  ))
  



export default MapComponent;