
import React, { Component } from 'react';
import { render } from 'react-dom';
import { withScriptjs } from "react-google-maps";
import Map from '../components/MapsDirection';
//import './style.css';

const MapPage = () => {
  const MapLoader = withScriptjs(Map);

  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDLUlo_KDKi9wdGotqmAT_6AuI-lFHYoR8"
      loadingElement={<div style={{ height: `100%` }} />}
    />
  );
};

//render(<MapPage />, document.getElementById('Map'));
