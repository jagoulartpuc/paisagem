import React, { Component } from 'react'
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const Map = compose(
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
    
        defaultZoom={15}
        center={{ lat: props.lat, lng: props.long }}
    >
        {props.isMarkerShown && props.individuos.map(indiv => (
            <Marker 
                key={indiv.id_individuo}
                position={{ lat: Number(indiv.lat), lng: Number(indiv.long) }}   
                onClick={() => props.onClickIndividuo(indiv.id_individuo)}
            />
        ))
        }
    </GoogleMap>
    
)



export default Map