import React, { Component } from 'react'
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const MapWithAMarker = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA_WObUiYD7YpoYufR84re1LZHAJeAGXkY",
        loadingElement: <div style={{ height: `100%` , width: `100%`}} />,
        containerElement: <div style={{ height: `500px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }), 
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={20}
        center={{ lat:  props.currentLocation.lat, lng: props.currentLocation.long }}
        onClick={props.onMapClick}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.currentLocation.lat, lng: props.currentLocation.long }} draggable={true}  
        ref={props.onMarkerMounted} onDragEnd={props.onPositionChanged } />}
    </GoogleMap>
    
)//



export default MapWithAMarker