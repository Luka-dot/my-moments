import { IonAvatar, IonItem, IonLabel } from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux';
import './ChatItem.css'

function ChatItem(props: any) {

    function setSelectedUserForChat() {

    }
    console.log(props.contact)
    return (
        <IonItem
            lines="none"
            key={props.contact.createdAt}
            onClick={setSelectedUserForChat}
            routerLink={`/my/teams/${props.currentUser.uid}/chatPage/${props.contact.uid}`} >
            <IonAvatar slot="start">
                <img src={props.contact.pictureUrl} alt="icon" />
            </IonAvatar>
            <IonLabel>
                <h2>{props.contact.userName}</h2>
                <p>Here will be message shown. Here will be message shown</p>
            </IonLabel>
        </IonItem>)
}

const mapStateToProps = (state) => ({
    currentUser: state.auth.curentUserDetails,
});

export default connect(mapStateToProps, {})(ChatItem);
