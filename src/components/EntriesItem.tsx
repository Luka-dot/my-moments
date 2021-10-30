import {
    IonItem,
    IonLabel,
    IonThumbnail,
    IonImg,
    IonText,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { formatDate } from '../utils/helpers';
import { Entry } from '../Models';
import { connect } from "react-redux";
import { getTeamEvents } from "../actions/TeamActions";

import './entriesItem.css';

interface EntriesProps {
    entries: Entry[]
}

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
                        routerLink={`/my/entries/view/${event.id}`}
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
});

export default connect(mapStateToProps, null)(EntriesItem);