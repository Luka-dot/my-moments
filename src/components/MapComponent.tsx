import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = (props: any, { text }) => <div>{text}</div>;

const MapComponent = (props: any) => {
    const defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };


    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCNAPGtVyQOHKP2A_tIHeWNQmnHcsLqt9Y' }}
                center={defaultProps.center}
                zoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );

}

export default MapComponent;