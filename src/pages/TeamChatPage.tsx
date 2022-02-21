import React from 'react'
import { connect } from 'react-redux'
import { IonCol, IonFooter, IonHeader, IonItem, IonList, IonPage, IonRow, IonText } from '@ionic/react';

import './teamChatPage.css';
import ChatItem from '../components/chat/ChatItem';

export const TeamChatPage = (props: any) => {
    return (
        <IonPage>
            {/* <IonRow>
                <IonCol>
                    <IonHeader>
                        <IonText>Welcome to Team Chat</IonText>
                    </IonHeader>
                </IonCol>
            </IonRow> */}
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
}

const mapStateToProps = (state) => ({
    team: state.team,
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