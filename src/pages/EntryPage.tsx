import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { firestore } from "../firebase";
import { Entry, toEntry } from "../Models";
import { useAuth } from "../Auth";

import { trash as trashIcon } from "ionicons/icons";

interface RouterParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { userId } = useAuth() as any;
  const history = useHistory();
  const { id } = useParams<RouterParams>();
  const [entry, setEntry] = useState<Entry>();

  useEffect(() => {
    const entryRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries")
      .doc(id);
    entryRef.get().then((doc) => {
      setEntry(toEntry(doc));
    });
  }, [id, userId]);

  const handleDelete = async () => {
    const entryRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries")
      .doc(id);
    await entryRef.delete();
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={handleDelete}>
              <IonIcon icon={trashIcon} slot="icon-only" />
            </IonButton>
          </IonButtons>
          <IonTitle>Entry for {entry?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">{entry?.description}</IonContent>
    </IonPage>
  );
};

export default EntryPage;

{
  /* <IonPage>
      {!entry ? (
        <IonPage>
          <IonLoading isOpen />
        </IonPage>
      ) : (
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
      )}
    </IonPage> */
}
