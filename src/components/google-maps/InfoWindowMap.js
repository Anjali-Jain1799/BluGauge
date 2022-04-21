import React, {Component} from 'react';
import { Marker, InfoWindow } from "react-google-maps";


class InfoWindowMap extends Component {

    constructor(props){
        super(props);

        this.state = {
            isOpen: false
        }

    }

    handleToggleOpen = () => {

        this.setState({
            isOpen: true
        });
    }

    handleToggleClose = () => {
        this.setState({
            isOpen: false
        });
    }


  render() {

    return (
            <Marker
                key={this.props.bin.bin_id}
                position={{ lat: parseFloat(this.props.bin.latitude), lng: parseFloat(this.props.bin.longitude)}}
                //label={this.props.bin_id.toString()}
                //label={this.props.bin.bin_id}
                
                icon={this.props.bin.ico}
                onClick={() => this.handleToggleOpen()}
            >
            {/* {console.log(this.props)} */}

            {
                this.state.isOpen &&
             <InfoWindow onCloseClick={() => this.handleToggleClose()}>
                <span>{`ID: ${this.props.bin.bin_id}, Place: ${this.props.bin.place}, Status: ${this.props.bin.status}, `}
                <a href={`http://maps.google.com/?q=${this.props.bin.latitude},${this.props.bin.longitude}`}  rel="noreferrer" target="_blank">View on Google Maps</a>
                </span>
                
             </InfoWindow>
            }


            </Marker>

        )
  }
}

export default InfoWindowMap;