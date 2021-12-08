import {
    IonCol,
    IonGrid,
    IonRow,
    IonText,
} from "@ionic/react";
import React from "react";
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