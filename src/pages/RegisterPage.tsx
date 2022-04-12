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
  IonButtons,
  IonBackButton,
  IonSegment,
  IonSegmentButton,
  IonIcon,
} from "@ionic/react";
import { chevronBackCircleOutline as backIcon } from "ionicons/icons";
import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { CameraResultType, CameraSource, Camera } from "@capacitor/camera";
import { auth, createUserProfileDocument2, storage } from "../firebase";
import { logInUser } from "../actions/AuthActions";

//const { Camera } = Plugins;

async function savePicture(blobUrl, userId) {

  const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = snapshot.ref.getDownloadURL();
  URL.revokeObjectURL(blobUrl);
  return url;
}

const RegisterPage: React.FC = (props: any) => {
  //  const { loggedIn } = useAuth();
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    userName: '',
    userRole: 'Player',
    pictureUrl: "/assets/placeholder.png",
    isAdmin: false,
  });

  useEffect(() => {
    console.log(newUser);
  }, [newUser])

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
    const { email, password, userName, userRole, isAdmin, pictureUrl } = newUser;

    try {
      setStatus({ loading: true, error: false });
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      if (!pictureUrl.startsWith("/assets")) {
        newUser.pictureUrl = await savePicture(pictureUrl, user.uid);
      }

      await createUserProfileDocument2(user, { newUser });
      setStatus({ loading: false, error: false });
      props.logInUser(email, password);

    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log("error ", error);
    }
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  }

  // if (loggedIn) {
  //   return <Redirect to="/my/entries" />;
  // }

  if (props.user.loggedIn === true) {
    return <Redirect to="/teams" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
          <IonButtons slot="start">
            <IonButton routerLink="/login" >
              <IonIcon icon={backIcon}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem lines="none">
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              name="email"
              type="email"
              required={true}
              value={newUser.email}
              onIonChange={(e) => handleInputChange(e)}
            />
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              name="password"
              type="password"
              required={true}
              value={newUser.password}
              onIonChange={(e) => handleInputChange(e)}
            />
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">User Name</IonLabel>
            <IonInput
              name='userName'
              type="text"
              pattern="text"
              required={true}
              value={newUser.userName}
              onIonChange={(e) => handleInputChange(e)}
            />
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">Role</IonLabel>
            <IonSegment value={newUser.userRole} onIonChange={(e) => setNewUser({ ...newUser, userRole: e.detail.value })}>
              <IonSegmentButton value='Player' >Player</IonSegmentButton>
              <IonSegmentButton value='Coach'>Coach</IonSegmentButton>
              <IonSegmentButton value="Parent">Parent</IonSegmentButton>
            </IonSegment>
          </IonItem>
          <IonItem lines="none">
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

const mapStateToProps = (state) => {
  return ({
    user: state.auth,
    userLoggedIn: state.auth.loggedIn,
  })
}

export default connect(mapStateToProps, { logInUser })(RegisterPage);
