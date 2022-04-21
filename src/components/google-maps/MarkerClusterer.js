import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps, withHandlers } from 'recompose';

const { MarkerClusterer } = require('react-google-maps/lib/components/addons/MarkerClusterer');

const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL:
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyDLUlo_KDKi9wdGotqmAT_6AuI-lFHYoR8&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `500px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers();
            console.log(`Current clicked markers length: ${clickedMarkers.length}`);
            console.log(clickedMarkers);
        }
    }),
    withScriptjs,
    withGoogleMap
)((props) => (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 23.2156, lng: 72.6369 }}>
        <MarkerClusterer onClick={props.onMarkerClustererClick} averageCenter enableRetinaIcons gridSize={60}>
            {props.bins.map((bin) => (
                <Marker key={bin.bin_id} position={{ lat: bin.latitude, lng: bin.longitude }} />
            ))}
        </MarkerClusterer>
    </GoogleMap>
));

export default MapWithAMarkerClusterer;
