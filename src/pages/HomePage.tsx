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
  IonLabel,
} from "@ionic/react";
import { add as addIcon } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { useAuth } from "../Auth";

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
    return entriesRef.onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
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
              <IonLabel>
                <h3>{entry.title}</h3>
                <h4>{formatDate(entry.date)}</h4>
              </IonLabel>
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
