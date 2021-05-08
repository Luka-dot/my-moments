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
import { useAuth } from "../Auth";
import { auth } from "../firebase";

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: false });
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log("error ", error);
    }
  };

  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(event) => setEmail(event.detail.value)}
            />
          </IonItem>
          <IonItem>
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
            Registration failed. Please try again.
          </IonText>
        )}
        <IonButton expand="block" onClick={handleRegister}>
          Create Account
        </IonButton>
        <br></br>
        <IonButton expand="block" fill="clear" routerLink="/login">
          Already have account?
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
