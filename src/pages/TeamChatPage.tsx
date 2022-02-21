import React, { useState } from 'react'
import { connect } from 'react-redux'
import { IonAvatar, IonCol, IonFooter, IonHeader, IonItem, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';

import './teamChatPage.css';
import ChatItem from '../components/chat/ChatItem';

export const TeamChatPage = (props: any) => {
    const [selectedTab, setSelectedTab] = useState(true)
    console.log(selectedTab)

    function toggleTabs() {
        console.log('setting')
        setSelectedTab(!selectedTab)
    }

    if (selectedTab === true) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonRow >
                            <IonItem lines="none" >
                                <IonTitle  >Chat</IonTitle>
                            </IonItem>
                            <IonItem lines="none" onClick={toggleTabs}>
                                <IonText>Contacts</IonText>
                            </IonItem>
                        </IonRow>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    {
                        props.team.members.map((member) => <ChatItem contact={member} />)
                    }
                </IonList>
                <IonFooter >
                    <IonItem >chat text field</IonItem>
                </IonFooter>
            </IonPage>
        )
    } else if (selectedTab === false) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonRow >
                            <IonItem lines="none" onClick={toggleTabs}>
                                <IonText>Chat</IonText>
                            </IonItem>
                            <IonItem lines="none">
                                <IonTitle >Contacts</IonTitle>
                            </IonItem>
                        </IonRow>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    {
                        props.team.members.map((member) => <ChatItem contact={member} />)
                    }
                </IonList>
            </IonPage>
        )
    }
}

const mapStateToProps = (state) => ({
    team: state.team,
    currentUser: state.auth.curentUserDetails,
})

export default connect(mapStateToProps, {})(TeamChatPage)



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