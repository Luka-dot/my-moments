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
                    <IonCard className="entryCard" key={event.id}>
                        <IonItem
                            button
                            routerLink={`/my/teams/team/${props.selectedTeam}/entries/view/${event.id}`}
                        //    routerLink={`/my/teams/team/${props.selectedTeam}/entries/view/edit/${event.id}`}
                        >
                            <IonGrid>
                                <IonRow>
                                    <IonCol size='2' className="dateCol">
                                        {formatDate(event.date).split(',')[0]}
                                    </IonCol>
                                    <IonCol size='8' className="infoCol">
                                        <IonLabel>
                                            <h3>{event.title}</h3>
                                            <h4>{formatDate(event.date)}</h4>
                                        </IonLabel>
                                    </IonCol>
                                    <IonCol size='2' className="matchCol">
                                        {!event.isMatch ?
                                            <IonText></IonText>
                                            :
                                            <IonCol size="2" >
                                                <IonText className="matchDay">M</IonText>

                                            </IonCol>
                                        }
                                    </IonCol>
                                    {

                                    }
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    </IonCard>
                ))
            }
        </div >
    );
};

const mapStateToProps = (state) => ({
    teamEvents: state.team.events,
    selectedTeam: state.team.team
});

export default connect(mapStateToProps, null)(EntriesItem);