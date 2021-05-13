import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { add as addIcon } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { useAuth } from "../Auth";
import EntriesItem from '../components/EntriesItem';

import { firestore } from "../firebase";
import { Entry, toEntry } from "../Models";

import { formatDate } from "../utils/helpers";

const HomePage: React.FC = () => {
  const { userId } = useAuth() as any;
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries");
    return entriesRef
      .orderBy("date", "desc")
      .onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily Moments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <EntriesItem entries={entries} />
        </IonList>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
