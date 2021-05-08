import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import { entries } from "../dummyData";

interface RouterParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { id } = useParams<RouterParams>();
  const entry = entries.find((entry) => entry.id === id);
  if (!entry) {
    throw new Error("no entry with that id found!");
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Entry for {entry.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Just a entry page text.</IonContent>
    </IonPage>
  );
};

export default EntryPage;
