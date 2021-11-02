import {
    IonItem,
    IonLabel,
    IonText,
} from "@ionic/react";
import React from "react";
import { formatDate } from '../utils/helpers';
import { connect } from "react-redux";

import './entriesItem.css';

const EntriesItem = (props: any) => {

    if (!props.teamEvents) {
        return (
            <div>Loading....</div>
        )
    }
    const events = props.teamEvents

    return (
        <div>
            {
                events.map((event) => (
                    <IonItem
                        button
                        key={event.id}
                        routerLink={`/my/teams/team/${props.selectedTeam}/entries/view/${event.id}`}
                    //    routerLink={`/my/teams/team/${props.selectedTeam}/entries/view/edit/${event.id}`}
                    >
                        <IonLabel>
                            <h3>{event.title}</h3>
                            <h4>{formatDate(event.date)}</h4>
                        </IonLabel>
                        {!event.isMatch ?
                            <IonText></IonText>
                            :
                            <p className="matchDay">M</p>
                        }
                        {

                        }
                    </IonItem>
                ))
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    teamEvents: state.team.events,
    selectedTeam: state.team.team
});

export default connect(mapStateToProps, null)(EntriesItem);