import { IonGrid, IonRow, IonText, IonCol, IonAvatar, IonItem, IonLabel, IonCard, IonIcon, IonButton, IonCardContent, IonList } from '@ionic/react'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from "react-router";
import { formatDistance } from 'date-fns';
import { listenToEventChat } from '../actions/EventsAction';
import { firebaseObjectToArray, getEventChatRef } from '../firebase';
import EventChatForm from './EventChatForm';
import './eventChat.css';

interface RouterParams {
    id: string;
}

const EventChat: React.FC = (props: any) => {
    const { id } = useParams<RouterParams>();
    console.log(id)

    useEffect(() => {
        getEventChatRef(id).on('value', snapshot => {
            if (!snapshot.exists()) return;
            props.listenToEventChat(firebaseObjectToArray(snapshot.val()))
        })
    }, [id])

    if (!props.currentUser) {
        return (
            <div>loading</div>
        )
    }

    return (

        <IonGrid>
            <IonRow>
                <IonCol size='12'>
                    <IonText></IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size='12'>
                    <IonList>
                        {
                            props.eventComments.map((comment) => (
                                <IonGrid>
                                    <IonRow>
                                        <IonItem className='chatItem' key={comment.id} >
                                            <IonAvatar slot='start'>
                                                <img className='avatarImg' src="/avatar-grey.png" />
                                            </IonAvatar>
                                            <IonLabel>
                                                <IonRow className='messageTitleRow'>
                                                    <h3>{comment.displayName}</h3>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <h5 className='posted'>{formatDistance(comment.date, new Date())}</h5>
                                                </IonRow>
                                                <IonText>{comment.text}</IonText>
                                            </IonLabel>
                                        </IonItem>
                                    </IonRow>
                                </IonGrid>
                            ))
                        }
                    </IonList>
                </IonCol>
                <IonCol size='12'>
                    <EventChatForm />
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.auth,
    currentUserId: state.auth.user.uid,
    teamEvents: state.team.events,
    teamMembers: state.team.members,
    teamId: state.team.team,
    singleEntry: state.team.singleEvent,
    attendanceRecord: state.team.eventAttendance,
    allAtendees: state.team.eventAttendance,
    eventComments: state.team.comments
});

export default connect(mapStateToProps, { listenToEventChat })(EventChat)

//  targetSdkVersion targetSdkVersion = project.hasProperty('targetSdkVersion') ? rootProject.ext.targetSdkVersion : 29


// {
//     props.eventComments.map((comment) => (
//         <IonItem className='chatItem' key={comment.id} >
//             <IonAvatar slot='start'>
//                 <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
//             </IonAvatar>
//             <IonLabel>
//                 <IonRow>
//                     <h3>{comment.displayName}</h3>&nbsp;&nbsp;&nbsp;&nbsp;
//                     <h5>{formatDistance(comment.date, new Date())}</h5>
//                 </IonRow>
//                 <IonText>{comment.text}</IonText>
//             </IonLabel>
//         </IonItem>
//     ))
// }


// <IonCard>
//                         <IonItem>
//                             <IonAvatar slot='start' >
//                                 <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
//                             </IonAvatar>
//                             <IonLabel>Te Big Boss</IonLabel>
//                             <IonLabel>about 1 day ago</IonLabel>
//                         </IonItem>
//                         <IonCardContent>
//                             This is content, without any paragraph or header tags,
//                             within an ion-cardContent element.
//                         </IonCardContent>
//                     </IonCard>