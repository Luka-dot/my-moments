import { IonBackButton, IonAvatar, IonContent, IonHeader, IonText, IonTitle, IonToolbar, IonButtons } from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux';
import { IonPage } from '@ionic/react';

const ChatPage = (props) => {
    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton />
                </IonButtons>
                <IonAvatar slot="start">
                    <img src={props.currentUser.pictureUrl} alt="" />
                </IonAvatar>
                <IonTitle>Test User</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonText>Chat page</IonText>
        </IonContent>
    </IonPage>;
};

const mapStateToProps = (state) => ({
    currentUser: state.auth.curentUserDetails,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
