import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Modal } from '../shared/Modal';

const SettingsPage: React.FC = () => {
  const [loggingout, setLoggingout] = useState(false);

  const logOutHandler = () => {
    auth.signOut()
  }
  const logOutCancel = () => {
    setLoggingout(false)
  }

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
      <IonContent className="ion-padding">
        <IonButton color="medium" expand="block" onClick={() => setLoggingout(true)}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
