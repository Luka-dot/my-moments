import {
  IonButton,
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonText,
  IonLoading,
} from "@ionic/react";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import { useAuth } from "../Auth";
// import { auth } from "../firebase";

import { logInUser } from '../actions/AuthActions';

const LoginPage: React.FC = (props: any) => {
  //  const { loggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleLogin = () => {
    props.logInUser(email, password);
  };

  if (props.user.loggedIn === true) {
    return <Redirect to="/teams" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem lines="none">
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(event) => setEmail(event.detail.value)}
            />
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(event) => setPassword(event.detail.value)}
            />
          </IonItem>
        </IonList>
        {status.error && (
          <IonText color="danger">
            Invalid Credentials. Please try again.
          </IonText>
        )}
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
        <br></br>
        <IonButton expand="block" fill="clear" routerLink="/register">
          Don't have account?
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state) => {
  return ({
    user: state.auth,
    userLoggedIn: state.auth.loggedIn,
  })
}

export default connect(mapStateToProps, { logInUser })(LoginPage);
