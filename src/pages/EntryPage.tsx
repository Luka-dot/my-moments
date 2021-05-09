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
import { useParams } from "react-router";
import { firestore } from "../firebase";
import { Entry, toEntry } from "../Models";

interface RouterParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const [entry, setEntry] = useState<Entry>();
  const { id } = useParams<RouterParams>();

  useEffect(() => {
    const entryRef = firestore.collection("Entries").doc(id);
    entryRef.get().then((doc) => {
      setEntry(toEntry(doc));
    });
  }, [id]);

  // const entry = entries.find((entry) => entry.id === id);
  // if (!entry) {
  //   throw new Error("no entry with that id found!");
  // }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Entry for {entry?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">{entry?.description}</IonContent>
    </IonPage>
  );
};

export default EntryPage;
