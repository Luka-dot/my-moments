import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { IonButton, IonButtons, IonIcon, IonItem } from '@ionic/react';

import { arrowBackOutline as backIcon, create as createIcon, chevronDown as downArrow, chevronUp as upArrow } from "ionicons/icons";

import './mapComponent.css';

const MapComponent = (props: any) => {

    const defaultProps = {
        center: {
            lat: props.coordinance.lat,
            lng: props.coordinance.lng
        },
        zoom: 15
    };

    function showTab() {
        const tabBar = document.getElementById('appTabBar');
        if (tabBar !== null) {
            console.log("enabled")
            tabBar.style.display = 'flex';
        }
    }

    const [isAdmin, setIsAdmin] = useState();

    useEffect(() => {
        setIsAdmin(props.isUserIsAdmin());
        console.log(process.env.REACT_APP_G_MAPS)
    }, [])

    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
            position: { lat: props.coordinance.lat, lng: props.coordinance.lng },
            map,
        });
        return marker;
    };


    const handleGoingBack = () => {
        console.log('erererer')
        props.toggleNavigation()
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '30vh', width: '100%', }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_G_MAPS }}
                center={defaultProps.center}
                zoom={defaultProps.zoom}
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            >

                <IonButton
                    className='iconContainer'
                    routerLink={`/my/teams/team/${props.currentTeam}`}
                    onClick={() => handleGoingBack()}
                    fill='clear' >
                    <IonIcon className='backButton' icon={backIcon} slot="icon-only" />
                </IonButton>

            </GoogleMapReact>
        </div>
    );

}

export default MapComponent;