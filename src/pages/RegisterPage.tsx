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
import { auth, createUserProfileDocument } from "../firebase";

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    userName: ''
  })
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [userName, setUserName] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleRegister = async () => {
    const { email, password, userName } = newUser;
    console.log('state when creatung ', email, password, userName)
    try {
      setStatus({ loading: true, error: false });
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, { userName });

    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log("error ", error);
    }
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  }

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
              name="email"
              type="email"
              value={newUser.email}
              onIonChange={(e) => handleInputChange(e)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              name="password"
              type="password"
              value={newUser.password}
              onIonChange={(e) => handleInputChange(e)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">User Name</IonLabel>
            <IonInput
              name='userName'
              type="text"
              value={newUser.userName}
              onIonChange={(e) => handleInputChange(e)}
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
