import React, { useState } from 'react';
import { IonButton, IonContent, IonItem, IonList, IonListHeader, IonPage, useIonPopover } from '@ionic/react';

const CreatePopOverComponent: React.FC<{
  onHide: () => void;
}> = ({ onHide }) => (

  <IonList>
    <IonListHeader>BLAAAA</IonListHeader>
    <IonItem button>Create a new Team</IonItem>
    <IonItem button>Creat a new Cub</IonItem>
    <IonItem lines="none" detail={false} button onClick={onHide}>
      Close
    </IonItem>
  </IonList>
);

export default CreatePopOverComponent