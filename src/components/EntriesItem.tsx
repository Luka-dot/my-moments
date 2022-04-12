import {
    IonCard,
    IonCol,
    IonFooter,
    IonHeader,
    IonIcon,
    IonRow,
    IonText,
} from "@ionic/react";
import { calendarOutline as calendarIcon } from "ionicons/icons";
import { location as locationIcon } from "ionicons/icons";
import React from "react";
import { formatDateDay } from '../utils/helpers';
import { connect } from "react-redux";

import './entriesItem.css';

const EntriesItem = (props: any) => {

    if (!props.teamEvents) {
        return (
            <div>Loading....</div>
        )
    }
    const events = props.teamEvents

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
                    <IonCard
                        className={event.isMatch ? "entryCardMatch" : "entryCard"}
                        key={event.id}
                        routerLink={`/my/teams/team/${props.selectedTeam}/entries/view/${event.id}`}
                    >
                        <IonCol className='titleCol'>
                            <IonRow >
                                <IonCol text-end >
                                    <IonText className='titleText'>{event.title}</IonText>
                                </IonCol> <IonCol>
                                    <IonText className='eventType' color={event.isMatch ? "danger" : "success"}>
                                        {event.isMatch ? "Match" : "Practice"}
                                    </IonText>
                                </IonCol>
                            </IonRow>
                            <IonRow></IonRow>
                            <IonRow>
                                <IonText className='eventText'>
                                    {event.description}
                                </IonText>
                            </IonRow>
                            <IonCol size='4' >
                            </IonCol>
                            <IonFooter className="ion-no-border">
                                <IonRow >
                                    <IonCol size='4' className='locationText'  >
                                        <IonIcon icon={calendarIcon} color='tertiary' className='iconText' />
                                        <IonText >
                                            {formatDateDay(event.date)}
                                        </IonText>
                                    </IonCol>
                                    <IonCol size='5' className='locationText' offset='1'>
                                        <IonIcon icon={locationIcon} color='tertiary' className='iconText' />
                                        <IonText >
                                            {event.location}
                                        </IonText>
                                    </IonCol>
                                </IonRow>
                            </IonFooter>
                        </IonCol>
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

// <IonGrid>
//                                 <IonRow>
//                                     <IonCol size='2' className="dateCol">
//                                         <IonRow className='monthText'>
//                                             {formatDate(event.date).split(' ')[0]}
//                                         </IonRow>
//                                         <IonRow className='dateText'>
//                                             {formatDate(event.date).split(' ')[1].split(',')}
//                                         </IonRow>
//                                     </IonCol>
//                                     <IonCol size='8' className="infoCol">
//                                         <IonLabel>
//                                             <h3 ><IonText className='eventTitle' >{event.title}</IonText></h3>
//                                             <h4><IonText className='timeStarts'>Starts at: </IonText><IonText className='time'>{formatTime(event.startTime)}</IonText></h4>
//                                         </IonLabel>
//                                     </IonCol>
//                                     <IonCol size='2' className="matchCol">
//                                         {!event.isMatch ?
//                                             <IonText></IonText>
//                                             :
//                                             <IonCol size="2" >
//                                                 <IonText className="matchDay">M</IonText>

//                                             </IonCol>
//                                         }
//                                     </IonCol>
//                                     {

//                                     }
//                                 </IonRow>
//                             </IonGrid>