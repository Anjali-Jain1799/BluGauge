/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  //withScriptjs,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
import { Grid } from '@material-ui/core';
class Map extends Component {
  state = {
    directions: null
  };

  
  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    const origin = { lat: 23.2293, lng: 72.6739 };
    const destination = { lat: 23.1926, lng: 72.6462 };
    const waypoints = [
          {location: new google.maps.LatLng(23.2328, 72.6314), stopover: true},
          {location: new google.maps.LatLng(23.2844,72.6910), stopover: true}
        ]
    // console.log(waypoints[0].location.lat())
    // let url = "http://maps.google.com/maps?saddr=23.2293,72.6739&daddr=23.2328,72.6314+to:23.2844,72.6910+to:23.1926,72.6462"
    
    // Function to reorder elements of arr[] according
      // to index[]
      function reorder(arr, index, n) {
        var temp = [...Array(n)];
        // arr[i] should be present at index[i] index
        for (let i = 0; i < n; i++) temp[index[i]] = arr[i];
        // Copy temp[] to arr[]
        for (let i = 0; i < n; i++) {
          arr[i] = temp[i];
          index[i] = i;
        }
      }
      
      
     // Driver program
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
    
        // waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          // console.log(result.routes[0].waypoint_order)
          reorder(waypoints, result.routes[0].waypoint_order, waypoints.length);
          // console.log(waypoints)
          let x = ``;
          for(let i = 0; i < waypoints.length; i++){
            x += `${waypoints[i].location.lat()},${waypoints[i].location.lng()}+to:`
          }
          let url = `http://maps.google.com/maps?saddr=${origin.lat},${origin.lng}&daddr=`+x+`+${destination.lat},${destination.lng}`;
          console.log(url)
        
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 23.2156, lng: 72.6369 }}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
    ));

    return (
      <div>
        <Grid>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <GoogleMapExample
                      containerElement={<div style={{ height: `500px`, width: "1000px" }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    />
                </Grid>
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default Map;
