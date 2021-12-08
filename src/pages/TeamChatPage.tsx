import React from 'react'
import { connect } from 'react-redux'
import { IonCol, IonContent, IonFooter, IonHeader, IonItem, IonList, IonPage, IonRow, IonText } from '@ionic/react';

import './teamChatPage.css';

export const TeamChatPage = (props) => {
    return (
        <IonPage>
            <IonRow>
                <IonCol>
                    <IonHeader>
                        <IonText>Welcome to Team Chat</IonText>
                    </IonHeader>
                </IonCol>
            </IonRow>
            <IonContent>
                <IonList>
                    <IonCol size='12'>
                        <IonItem lines="none" >
                            <IonText>message</IonText>
                        </IonItem>
                    </IonCol>
                    <IonCol size='12'>
                        <IonItem lines="none" >
                            <IonText>message</IonText>
                        </IonItem>
                    </IonCol>
                    <IonCol size='12'>
                        <IonItem className='myMessage' lines="none" >
                            <IonText>my message</IonText>
                        </IonItem>
                    </IonCol>
                    <IonCol size='12'>
                        <IonItem lines="none" >
                            <IonText>message</IonText>
                        </IonItem>
                    </IonCol>
                </IonList>
            </IonContent>
            <IonFooter >
                <IonItem >chat text field</IonItem>
            </IonFooter>
        </IonPage>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TeamChatPage)
