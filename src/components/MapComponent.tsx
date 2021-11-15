import React from 'react';
import GoogleMapReact from 'google-map-react';

const MapComponent = (props: any) => {

    const defaultProps = {
        center: {
            lat: props.coordinance.lat,
            lng: props.coordinance.lng
        },
        zoom: 15
    };

    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
            position: { lat: props.coordinance.lat, lng: props.coordinance.lng },
            map,
        });
        return marker;
    };


    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '30vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCNAPGtVyQOHKP2A_tIHeWNQmnHcsLqt9Y' }}
                center={defaultProps.center}
                zoom={defaultProps.zoom}
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            >
            </GoogleMapReact>
        </div>
    );

}

export default MapComponent;