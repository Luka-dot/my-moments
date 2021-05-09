import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { add as addIcon } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { useAuth } from "../Auth";

import { firestore } from "../firebase";
import { Entry, toEntry } from "../Models";

const HomePage: React.FC = () => {
  const { userId } = useAuth() as any;
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries");
    entriesRef.get().then((snapshot) => {
      const entries = snapshot.docs.map(toEntry); // same as (doc) => toEntry(doc)
      setEntries(entries);
    });
  }, [userId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {entries.map((entry) => (
            <IonItem
              button
              key={entry.id}
              routerLink={`/my/entries/view/${entry.id}`}
            >
              {entry.title}
            </IonItem>
          ))}
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
