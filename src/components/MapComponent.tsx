import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { IonBackButton, IonButton, IonButtons, IonIcon } from '@ionic/react';

import { trash as trashIcon, create as createIcon, chevronDown as downArrow, chevronUp as upArrow } from "ionicons/icons";

import './mapComponent.css';

const MapComponent = (props: any) => {

    const defaultProps = {
        center: {
            lat: props.coordinance.lat,
            lng: props.coordinance.lng
        },
        zoom: 15
    };

    const [isAdmin, setIsAdmin] = useState();

    useEffect(() => {
        setIsAdmin(props.isUserIsAdmin());
    }, [])

    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
            position: { lat: props.coordinance.lat, lng: props.coordinance.lng },
            map,
        });
        return marker;
    };
    console.log(process.env.REACT_APP_G_MAPS)

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '30vh', width: '100%', }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_G_MAPS }}
                center={defaultProps.center}
                zoom={defaultProps.zoom}
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            >
                <IonButtons >
                    <IonBackButton className='backButton' />
                </IonButtons>

            </GoogleMapReact>
        </div>
    );

}

export default MapComponent;