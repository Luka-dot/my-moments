import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useAuth } from "../Auth";

import { firestore } from "../firebase";

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth() as any;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries");
    const entryData = { title, description };
    const entryRef = await entriesRef.add(entryData);
    console.log(entryRef);
  };

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
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput
              value={title}
              onIonChange={(event) => setTitle(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={(event) => setDescription(event.detail.value)}
            />
          </IonItem>
          <IonButton expand="block" onClick={handleSave}>
            Save
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
