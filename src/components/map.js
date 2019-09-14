import React,{ useState } from 'react'
import MapGL, {GeolocateControl,NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN="pk.eyJ1Ijoic3VmaXlhbiIsImEiOiJjazBqNXN0eGMwNm9iM25wbnpycXBpbGR6In0.gLoao-amcGyv47WCwWygLQ";

const geolocateStyle = {
  float: 'right',
  margin: '10px',
  padding: '10px'
};
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

  const Map = (props) => {
    const [viewport, setViewPort ] = useState({
      width: "100%",
      height: 900,
      latitude: props.latitude,
      longitude: props.longitude,
      zoom: 2
  })

  const _onViewportChange = viewport => setViewPort({...viewport, transitionDuration: 0 })
  
  return (
      <MapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={_onViewportChange}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: false}}
          trackUserLocation={true}
        />
        <div className="nav" style={navStyle}>
            <NavigationControl/>
        </div>
      </MapGL>
  )
}

export default Map