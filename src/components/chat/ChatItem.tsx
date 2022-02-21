import { IonAvatar, IonItem, IonLabel } from '@ionic/react';
import React from 'react';
import './ChatItem.css'

function ChatItem(props: any) {
    return (
        <IonItem lines="none" key={props.contact.createdAt} >
            <IonAvatar slot="start">
                <img src={props.contact.pictureUrl} alt="icon" />
            </IonAvatar>
            <IonLabel>
                <h2>{props.contact.userName}</h2>
                <p>Here will be message shown. Here will be message shown</p>
            </IonLabel>
        </IonItem>)
}

export default ChatItem;
