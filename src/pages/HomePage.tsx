import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
} from "@ionic/react";
import React, { useState, useEffect } from "react";

import { firestore } from "../firebase";
import { Entry, toEntry } from "../Models";

const HomePage: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const entriesRef = firestore.collection("Entries");
    entriesRef.get().then((snapshot) => {
      const entries = snapshot.docs.map(toEntry); // same as (doc) => toEntry(doc)
      setEntries(entries);
    });
  }, []);

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
              routerLink={`/my/entries/${entry.id}`}
            >
              {entry.title}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
