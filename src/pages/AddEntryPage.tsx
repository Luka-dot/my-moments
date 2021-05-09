import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";

const AddEntryPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>ADD Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">TODO</IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
