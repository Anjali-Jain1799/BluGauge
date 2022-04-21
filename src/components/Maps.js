// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
// import React from 'react'; 
// //{useState, useEffect} from "react";
// import googleMapStyles from "../assets/GoogelMapsStyle";
// import { getBinData } from "../apipath";


// export class Maps extends React.Component {

//   constructor(props){
//     super(props);

//     this.state = {
//       bins : []
//     };
//   }

//   loadBinData = () => {
//     getBinData().then(response => this.setState({
//       bins: response
//     }))
//   }

//   componentDidMount() {
//     // this.setState({ 
//     //   bins: [...this.props.bins
//     // })
//     this.loadBinData()
//     console.log(this.props)
//     console.log(this.state.bins)
//   }

//   render() {
//     return this.props[0].map((index, val) => (
//       <div
//         style={{
//           height: "720px",
//           marginBottom: " 80px",
//           position: "relative",
//           overflow: "hidden",
//         }}
//         key={val}
//       >
//         <h1>Bin Locations</h1>
//         {/* <h1>{index.Name}</h1> */}
//         <Map
//           google={this.props.google}
//           zoom={13}
//           styles={index.Style}
//           initialCenter={{ lat: 23.2156, lng: 72.6369 }}
//         >
//           {this.state.bins.map((bin) => 
//           ( <Marker position={{lat: bin.latitude, lng: bin.longitude}} /> )
//             )
//           }
          
//           {/* <Marker position={{ lat: 23.2293, lng: 72.6739 }} /> */}
//         </Map>
//       </div>
//     ));
//   }
// }

// Maps.defaultProps = googleMapStyles;

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyDLUlo_KDKi9wdGotqmAT_6AuI-lFHYoR8",
// })(Maps);


// // <Marker position={{ lat: bin.latitude, lng: bin.longitude }} />)}