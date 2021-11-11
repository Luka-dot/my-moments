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
        <IonGrid>
            <IonRow className='titleRow'>
                <IonCol size='4' className='titleColumn'>
                    {
                        props.allAtendees.map((atendee) => (
                            atendee.status === 'yes' ?
                                <IonText color='success' key={atendee.id}>
                                    {atendee.name}
                                </IonText>
                                :
                                <div></div>
                        ))
                    }
                </IonCol>
                <IonCol size='4' className='titleColumn'>
                    {
                        props.allAtendees.map((atendee) => (
                            atendee.status === 'no' ?
                                <IonText color='danger' key={atendee.id}>
                                    {atendee.name}
                                </IonText>
                                :
                                <div></div>
                        ))
                    }
                </IonCol>
                <IonCol size='4' className='titleColumn'>
                    <IonRow>
                        {
                            props.allAtendees.map((atendee) => (
                                atendee.status === 'maybe' ?
                                    <IonText className="entryMaybe" key={atendee.id}>
                                        {atendee.name}
                                    </IonText>
                                    :
                                    <div></div>
                            ))
                        }
                    </IonRow>
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