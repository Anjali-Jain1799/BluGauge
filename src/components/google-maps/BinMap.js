import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
//import InfoWindowMap from './InfoWindowMap'

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{ lat: 23.2156, lng: 72.6369 }}
  >
    {props.bins.map((bin, i)=> (<Marker key={bin.bin_id} position={{lat: bin.latitude, lng: bin.longitude}}/>))}
    {/* {props.bins.map((bin, i)=> (<InfoWindowMap bin={bin}/>))} */}

  </GoogleMap>
));

<MapWithAMarker
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDLUlo_KDKi9wdGotqmAT_6AuI-lFHYoR8&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `500px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
