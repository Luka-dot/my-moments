import {
    IonCard,
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonLabel,
    IonRow,
    IonText,
} from "@ionic/react";
import { radioButtonOff as circleIcon } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { formatDate } from '../utils/helpers';
import { connect } from "react-redux";

import './entriesItem.css';
import './attendingDetails.css'

const AttendingDetails = (props: any) => {

    if (!props.allAtendees) {
        return (
            <div>Loading....</div>
        )
    }

    return (
        <IonGrid className='attendingGrid'>
            <IonRow className='titleRow'>
                <IonCol size='4' className='titleColumn'>
                    {
                        props.allAtendees.map((atendee) => (
                            atendee.status === 'yes' ?
                                <IonText color='success' key={atendee.id} className='atendeName'>
                                    {atendee.name}
                                </IonText>
                                :
                                <div key={atendee.id}></div>
                        ))
                    }
                </IonCol>
                <IonCol size='4' className='titleColumn'>
                    {
                        props.allAtendees.map((atendee) => (
                            atendee.status === 'no' ?
                                <IonText color='danger' key={atendee.id} className='atendeName'>
                                    {atendee.name}
                                </IonText>
                                :
                                <div key={atendee.id}></div>
                        ))
                    }
                </IonCol>
                <IonCol size='4' className='titleColumn'>
                    {
                        props.allAtendees.map((atendee) => (
                            atendee.status === 'maybe' ?
                                <IonRow key={atendee.id} className='goingRow'>
                                    <IonText className="entryMaybe" >
                                        {atendee.name}
                                    </IonText>
                                </IonRow>
                                :
                                <div key={atendee.id}></div>
                        ))
                    }
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

const mapStateToProps = (state) => ({
    teamEvents: state.team.events,
    selectedTeam: state.team.team,
    allAtendees: state.team.allAttendees,
});

export default connect(mapStateToProps, null)(AttendingDetails);