import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import React, { useState, useEffect, useRef } from "react";
import { CameraResultType, CameraSource, Plugins } from "@capacitor/core";
import { useHistory } from "react-router";
// import { useAuth } from "../Auth";
import { connect } from "react-redux";

import { firestore, storage } from "../firebase";

const { Camera } = Plugins;

async function savePicture(blobUrl, userId) {
  const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = snapshot.ref.getDownloadURL();
  return url;
}

const AddEntryPage: React.FC = (props: any) => {
  //  const { userId } = useAuth() as any;
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [pictureUrl, setPictureUrl] = useState("/assets/placeholder.png");
  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    return () => {
      if (pictureUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pictureUrl);
      }
    };
  }, [pictureUrl]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const pictureU = URL.createObjectURL(file);
      setPictureUrl(pictureU);
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
        setPictureUrl(photo.webPath);
      } catch (error) {
        console.log("user cancel photo.");
      }
    }
    fileInputRef.current.click();
  };

  const handleSave = async () => {
    const entriesRef = firestore
      .collection("users")
      .doc(props.currentUserId)
      .collection("entries");
    const entryData = { date, title, pictureUrl, description };

    if (!pictureUrl.startsWith("/assets")) {
      entryData.pictureUrl = await savePicture(pictureUrl, props.currentUserId);
    }
    await entriesRef.add(entryData);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>ADD Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem lines="none">
            <IonLabel position="stacked">Datez</IonLabel>
            <IonDatetime
              value={date}
              min="2021"
              max="2050-10-30"
              onIonChange={(event) => setDate(event.detail.value)}
            />
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput
              value={title}
              onIonChange={(event) => setTitle(event.detail.value)}
            />
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
              src={pictureUrl}
              alt=""
              style={{ cursor: "pointer" }}
              onClick={handlePictureClick}
            />
          </IonItem>
          <IonItem lines="none">
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={(event) => setDescription(event.detail.value)}
            />
          </IonItem>
          <IonButton expand="block" onClick={handleSave}>
            Save
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

// export default AddEntryPage;

const mapStateToProps = (state) => ({
  currentUserId: state.auth.user.uid
});

export default connect(mapStateToProps, {})(AddEntryPage);
