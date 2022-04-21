// eslint-disable-next-line no-unused-vars
/*global google*/

import React from 'react';
//import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'; // , Marker
import { compose, withProps } from 'recompose'; // , withStateHandlers
//import InfoWindowMap from './InfoWindowMap';

//import fancyMapStyles from './fancy-map-styles.json';

// const bin_locs = [{info: "Akshardham",lat: 23.2293, lng: 72.6739},
//             {info: "Indora Park", lat: 23.1926, lng: 72.6462},
//             {info: "Dandi Kutir", lat: 23.2328, lng: 72.6314}]

const StyledMapWithAnInfoBox = compose(
    withProps({
        googleMapURL:
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyDLUlo_KDKi9wdGotqmAT_6AuI-lFHYoR8&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `500px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        center: { lat: 23.2156, lng: 72.6369 }
    }),
    // withStateHandlers(
    //     () => ({
    //         isOpen: false
    //     }),
    //     {
    //         onToggleOpen: ({ isOpen }) => () => ({
    //             isOpen: !isOpen
    //         })
    //     }
    // ),
    withScriptjs,
    withGoogleMap
)((props) => (
    <GoogleMap defaultZoom={11} defaultCenter={props.center} > {/*defaultOptions={{ styles: fancyMapStyles }}*/}
        {/* <InfoBox
            defaultPosition={new google.maps.LatLng(props.center.lat, props.center.lng)}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
        >
            <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>Bins</div>
            </div>
        </InfoBox> */}
        {props.bins.map((bin, i)=> (<Marker key={bin.bin_id} position={{lat: bin.latitude, lng: bin.longitude}}/>))}
        {/* {props.bins.map((bin, i)=> (<InfoWindowMap bin={bin}/>))} */}
        {/* <Marker position={{ lat: 23.1926, lng: 72.6462 }} onClick={props.onToggleOpen}>
            {props.isOpen && (
                <InfoBox onCloseClick={props.onToggleOpen} options={{ closeBoxURL: ``, enableEventPropagation: true }}>
                    <div style={{ backgroundColor: `green`, opacity: 0.75, padding: `12px` }}>
                        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>Bin 4, Ward 2, Status Unfilled!</div>
                    </div>
                </InfoBox>
            )}
        </Marker> */}

    </GoogleMap>
));

export default StyledMapWithAnInfoBox;
