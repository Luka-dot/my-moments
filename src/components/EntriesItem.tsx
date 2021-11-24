import {
    IonCard,
    IonCol,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonRow,
    IonText,
} from "@ionic/react";
import { radioButtonOff as circleIcon } from "ionicons/icons";
import React from "react";
import { formatDate, formatTime } from '../utils/helpers';
import { connect } from "react-redux";

import './entriesItem.css';

const EntriesItem = (props: any) => {

    if (!props.teamEvents) {
        return (
            <div>Loading....</div>
        )
    }
    const events = props.teamEvents
    console.log(events.length < 1)
    if (events.length < 1) {
        return (
            <IonCard>
                <IonHeader>
                    <IonText>There are no events.</IonText>
                </IonHeader>
            </IonCard>
        )
    }

    return (
        <div>
            {
                events.map((event) => (
                    <IonCard className="entryCard" key={event.id}>
                        <IonItem
                            lines="none"
                            button
                            routerLink={`/my/teams/team/${props.selectedTeam}/entries/view/${event.id}`}
                        //    routerLink={`/my/teams/team/${props.selectedTeam}/entries/view/edit/${event.id}`}
                        >
                            <IonGrid>
                                <IonRow>
                                    <IonCol size='2' className="dateCol">
                                        <IonRow className='monthText'>
                                            {formatDate(event.date).split(' ')[0]}
                                        </IonRow>
                                        <IonRow className='dateText'>
                                            {formatDate(event.date).split(' ')[1].split(',')}
                                        </IonRow>
                                    </IonCol>
                                    <IonCol size='8' className="infoCol">
                                        <IonLabel>
                                            <h3 ><IonText className='eventTitle' >{event.title}</IonText></h3>
                                            <h4><IonText className='timeStarts'>Starts at: </IonText><IonText className='time'>{formatTime(event.startTime)}</IonText></h4>
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