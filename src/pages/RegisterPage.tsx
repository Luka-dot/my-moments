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
  isPlatform,
} from "@ionic/react";
import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../Auth";
import { CameraResultType, CameraSource, Plugins } from "@capacitor/core";
import { auth, createUserProfileDocument2, firestore, storage } from "../firebase";

const { Camera } = Plugins;

async function savePicture(blobUrl, userId) {
  console.log(blobUrl, userId)
  const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = snapshot.ref.getDownloadURL();
  URL.revokeObjectURL(blobUrl);
  return url;
}

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    userName: '',
    pictureUrl: "/assets/placeholder.png",
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const pictureU = URL.createObjectURL(file);
      setNewUser({ ...newUser, pictureUrl: pictureU });
    }
  };

  const handlePictureClick = async () => {
    if (isPlatform("capacitor")) {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Prompt,
          width: 600,
        });
        setNewUser({ ...newUser, pictureUrl: photo.webPath });
      } catch (error) {
        console.log("user cancel photo.");
      }
    }
    fileInputRef.current.click();
  };

  const [status, setStatus] = useState({ loading: false, error: false });
  const fileInputRef = useRef<HTMLInputElement>();

  const handleRegister = async () => {
    const { email, password, userName, pictureUrl } = newUser;

    try {
      setStatus({ loading: true, error: false });
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      if (!pictureUrl.startsWith("/assets")) {
        console.log('picture ', newUser.pictureUrl)
        console.log('user ', user.uid)
        newUser.pictureUrl = await savePicture(pictureUrl, user.uid);
      }

      await createUserProfileDocument2(user, { newUser });

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
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel>
            <br></br>
            <input
              type="file"
              accept="image/*"
              onChange={handleOnChange}
              hidden
              ref={fileInputRef}
            />
            <img
              src={newUser.pictureUrl}
              alt=""
              style={{ cursor: "pointer" }}
              onClick={handlePictureClick}
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
