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

const AttendingDetails = (props: any) => {
    const [yes, setYes] = useState(0)
    const [no, setNo] = useState(0)
    const [maybe, setMaybe] = useState(0)

    if (!props.allAtendees) {
        return (
            <div>Loading....</div>
        )
    }

    return (
        <div>
            {
                props.allAtendees.map((atendee) => (
                    <IonCard className="entryCard" key={atendee.id}>
                        {/* <IonItem
                            button
                            routerLink={`/my/teams/team/${props.selectedTeam}/entries/view/${event.id}`}
                        //    routerLink={`/my/teams/team/${props.selectedTeam}/entries/view/edit/${event.id}`}
                        > */}
                        <IonGrid>
                            <IonRow>
                                {atendee.name}
                            </IonRow>
                        </IonGrid>

                    </IonCard>
                ))
            }
        </div >
    );
};

const mapStateToProps = (state) => ({
    teamEvents: state.team.events,
    selectedTeam: state.team.team,
    allAtendees: state.team.allAttendees,
});

export default connect(mapStateToProps, null)(AttendingDetails);