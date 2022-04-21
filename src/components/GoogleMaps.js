// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import blueb from './google-maps/binblueb.png';
// import blues from './google-maps/binblues.png';
// import greenb from './google-maps/bingreenb.png';
import grayb from './google-maps/bingrayb.png';
import orangeb from './google-maps/binorangeb.png';
import redb from './google-maps/binredb.png';
import yellowb from './google-maps/binyellowb.png';
import purpleb from './google-maps/binpurpleb.png';
import blackb from './google-maps/binblackb.png';
import whiteb from './google-maps/binwhiteb.png';
import greens from './google-maps/bingreens.png';
import grays from './google-maps/bingrays.png';
import oranges from './google-maps/binoranges.png';
import reds from './google-maps/binreds.png';
import yellows from './google-maps/binyellows.png';
import purples from './google-maps/binpurples.png';
import blacks from './google-maps/binblacks.png';
import whites from './google-maps/binwhites.png';
import InfoWindowMap from './google-maps/InfoWindowMap';
//import InfoBox from './google-maps/InfoBox';
//import MarkerClusterer from './google-maps/MarkerClusterer';
//import Marker from './google-maps/Marker';
//import StreetViewPanorma from './google-maps/StreetViewPanorma';
//import ModuleNotification from '../../components/Widgets/Statistic/Notification';

//import fetch from 'isomorphic-fetch';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
//    Marker,
  } from "react-google-maps";
// TODO
// Implement new status changes for maps too
const MapWithAMarker = withScriptjs(withGoogleMap(props =>
<GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 23.2156, lng: 72.6369 }}
>

    {props.bins.forEach((bin) => {
        if(bin.color==="Blue"){    
            switch(bin.status){
                case "Fire":
                    bin.ico=blackb;
                    break;
                case "Low Battery":
                    bin.ico=purpleb;
                    break;
                case "Abnormal":
                    bin.ico=grayb;
                    break;
                case "Over Flow or Blockage":
                    bin.ico=redb;
                    break;
                case "Offline":
                    bin.ico=whiteb;
                    break;
                case "Overfilled":
                    bin.ico=orangeb;
                    break;
                case "Filled":
                    bin.ico=yellowb;
                    break;
                case "Unfilled":
                    bin.ico=blueb;
                    break;
                default:
                    bin.ico=blueb;
            }
        } else if (bin.color==="Green") {
            switch(bin.status){
                case "Fire":
                    bin.ico=blacks;
                    break;
                case "Low Battery":
                    bin.ico=purples;
                    break;
                case "Abnormal":
                    bin.ico=grays;
                    break;
                case "Over Flow or Blockage":
                    bin.ico=reds;
                    break;
                case "Offline":
                    bin.ico=whites;
                    break;
                case "Overfilled":
                    bin.ico=oranges;
                    break;
                case "Filled":
                    bin.ico=yellows;
                    break;
                case "Unfilled":
                    bin.ico=greens;
                    break;
                default:
                    bin.ico=greens;
            }
        }
    })}
    {/* {props.bins.map((bin)=> (<Marker key={bin.bin_id} position={{lat: bin.latitude, lng: bin.longitude}} icon={bin.ico}/>))} */}
    {props.bins.filter(bin=>bin.color==="Blue").map((bin, i)=> (<InfoWindowMap key={bin.bin_id} bin={bin}/>))}
    {props.bins.filter(bin=>bin.color==="Green").map((bin, i)=> (<InfoWindowMap key={bin.bin_id} bin={bin}/>))}

</GoogleMap>
));


const useStyles = makeStyles({
    map: {
        boxShadow: '0 3px 5px 2px #9e9e9e',
        padding: 0,
    },
    title: {
        fontSize: '27px',
        fonWeight: '500',
        fontFamily: 'Jost, sans-serif',
        textAlign: 'left'
    }
})

const GoogleMaps = ({ bins }) => {
 
    const classes = useStyles()
    return (
        <React.Fragment>
            <Row>
                <Col xl={12}>
                    <Card className={classes.map}>
                        <Card.Header>
                            <Card.Title className={classes.title} as="h5">Bins</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {/* <InfoBox bins={bins} /> */}
                            <MapWithAMarker
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDLUlo_KDKi9wdGotqmAT_6AuI-lFHYoR8&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `500px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                bins={bins}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                {/* <Col xl={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Marker Clusterer</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <MarkerClusterer bins={bins} />
                        </Card.Body>
                    </Card>
                </Col> */}
            </Row>
        </React.Fragment >
    );
};

export default GoogleMaps;
