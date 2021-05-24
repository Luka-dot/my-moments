import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { firestore } from "../firebase";
import { Modal } from '../shared/Modal';
import { useAuth } from '../Auth';
import { toAccount, Account } from '../Models';

const SettingsPage: React.FC = () => {
  const [loggingout, setLoggingout] = useState(false);
  const [accountHolder, setAccountHolder] = useState<Account>();
  const { userId } = useAuth() as any;

  useEffect(() => {
    const entryRef = firestore
      .collection("users")
      .doc(userId)
    entryRef.get().then((doc) => {
      setAccountHolder(toAccount(doc));
    });
  }, [userId]);

  if (!accountHolder) {
    return <IonPage>
      <h3>Loading...</h3>
    </IonPage>
  };

  const { userName, pictureUrl } = accountHolder;

  const logOutHandler = () => {
    auth.signOut()
  };

  const logOutCancel = () => {
    setLoggingout(false)
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Modal
        modalText={"Please confirm you wish to log out."}
        onConfirm={logOutHandler}
        onCancel={logOutCancel}
        displayModal={loggingout}
      />
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>User: {userName}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <img src={pictureUrl} alt={userName} />
        </IonCardContent>
      </IonCard>
      <IonContent className="ion-padding">
        <IonButton color="medium" expand="block" onClick={() => setLoggingout(true)}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
