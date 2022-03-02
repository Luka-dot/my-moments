import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { IonCol, IonFooter, IonHeader, IonItem, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';

import './teamChatPage.css';
import ChatItem from '../components/chat/ChatItem';
import ChatAllMembers from '../components/chat/ChatAllMembers';
import { getAllMembers, getTeamMembers } from '../actions/TeamActions';

export const TeamChatPage = (props: any) => {
    const [selectedTab, setSelectedTab] = useState(true)
    const [availableMembers, setAvailableMembers] = useState<any>()

    useEffect(() => {
        props.getTeamMembers(props.selectedTeam)
        props.getAllMembers()
    }, [])

    useEffect(() => {
        setAvailableMembers(props.members.filter(member => {
            return member.id !== props.currentUser.uid // !member.memberOfTeam.includes(props.selectedTeam)
        }))
    }, [props.allMembers, props.selectedTeam])

    function toggleTabs() {
        setSelectedTab(!selectedTab)
    }

    if (!availableMembers) {
        return (<div>... <p>Loading</p> ... </div>)
    }

    if (selectedTab === true) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonRow >
                            <IonItem lines="none" >
                                <IonTitle  >Team Chat</IonTitle>
                            </IonItem>
                            <IonItem lines="none" onClick={toggleTabs}>
                                <IonText>Contacts</IonText>
                            </IonItem>
                        </IonRow>
                    </IonToolbar>
                </IonHeader>
                <IonCol>
                    <IonList>
                        {
                            availableMembers.map((member) => <ChatItem contact={member} />)
                        }
                    </IonList>
                </IonCol>
                <IonFooter >
                    <IonItem >chat text field</IonItem>
                </IonFooter>
            </IonPage>
        )
    } if (selectedTab === false) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonRow >
                            <IonItem lines="none" onClick={toggleTabs}>
                                <IonText>Team Chat</IonText>
                            </IonItem>
                            <IonItem lines="none">
                                <IonTitle >Contacts</IonTitle>
                            </IonItem>
                        </IonRow>
                    </IonToolbar>
                </IonHeader>
                <IonCol>
                    <IonList>
                        {/* {
                            props.team.members.map((member) => <ChatItem contact={member} />)
                        } */}
                        <ChatAllMembers />
                    </IonList>
                </IonCol>
            </IonPage>
        )
    }
}

const mapStateToProps = (state) => ({
    team: state.team,
    currentUser: state.auth.curentUserDetails,
    selectedTeam: state.team.team,
    teamName: state.team.teamName,
    members: state.team.members,
    allMembers: state.team.allMembers
})

export default connect(mapStateToProps, { getTeamMembers, getAllMembers })(TeamChatPage)



// <IonContent>
//                 <IonList>
//                     <IonCol size='12'>
//                         <IonItem className='message' lines="none" >
//                             <IonText>message</IonText>
//                         </IonItem>
//                     </IonCol>
//                     <IonCol size='12'>
//                         <IonItem className='message' lines="none" >
//                             <IonText>message</IonText>
//                         </IonItem>
//                     </IonCol>
//                     <IonCol size='12'>
//                         <IonItem className='myMessage' lines="none" >
//                             <IonText>my message</IonText>
//                         </IonItem>
//                     </IonCol>
//                     <IonCol size='12'>
//                         <IonItem className='message' lines="none" >
//                             <IonText>message</IonText>
//                         </IonItem>
//                     </IonCol>
//                 </IonList>
//             </IonContent>


// <IonAvatar>
//                         <img src={props.currentUser.pictureUrl} alt="" />
//                     </IonAvatar>