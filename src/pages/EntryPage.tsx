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
import { formatDate } from "../utils/helpers";
import { trash as trashIcon } from "ionicons/icons";
import { Modal } from '../shared/Modal';

interface RouterParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { userId } = useAuth() as any;
  const history = useHistory();
  const { id } = useParams<RouterParams>();
  const [entry, setEntry] = useState<Entry>();
  const [deleteing, setDeleting] = useState(false);

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
    setDeleting(true)
    console.log('modal triggered ', deleteing)
    const entryRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries")
      .doc(id);
    await entryRef.delete();
    setDeleting(false);
    console.log('delete ends')
    history.goBack();
  };

  const cancelDeleting = () => {
    setDeleting(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setDeleting(true)}>
              <IonIcon icon={trashIcon} slot="icon-only" />
            </IonButton>
          </IonButtons>
          <IonTitle>Entry for {formatDate(entry?.date)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Modal
          modalText={"Are you sure you want to delete this memory?"}
          displayModal={deleteing}
          onCancel={cancelDeleting}
          onConfirm={handleDelete}
        />
        <h4>{entry?.title}</h4>
        <img src={entry?.pictureUrl} alt={entry?.title} />
        <p>{entry?.description}</p>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
