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
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { firestore } from "../firebase";
import { Modal } from '../shared/Modal';
import { toAccount, Account } from '../Models';
import { connect } from "react-redux";
import { logoutUser } from '../actions/AuthActions';
import { Link } from "react-router-dom";
import './settingsPage.css'

const SettingsPage: React.FC = (props: any) => {
  const [loggingout, setLoggingout] = useState(false);
  const [accountHolder, setAccountHolder] = useState<Account>();
  const userId = props.currentUserId;

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
    props.logoutUser()
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
          <IonCardTitle>User: {props.currentUser.email}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <img src={pictureUrl} alt={userName} />
        </IonCardContent>
      </IonCard>
      <IonContent className="ion-padding">
        <IonButton color="medium" expand="block" onClick={() => setLoggingout(true)}>
          Logout
        </IonButton>
        <br />
        <Link className='backLink' to={'/teams'}>
          <IonButton color="tertiary" fill='outline' expand="block" onClick={() => { }}>
            To Team Selection
          </IonButton>
        </Link>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state) => ({
  currentUserId: state.auth.user.uid,
  currentUser: state.auth.user
});

export default connect(mapStateToProps, { logoutUser })(SettingsPage);
