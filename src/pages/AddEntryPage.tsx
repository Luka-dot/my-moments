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
} from "@ionic/react";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../Auth";

import { firestore } from "../firebase";

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth() as any;
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

  const handleSave = async () => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries");
    const entryData = { date, title, description };
    const entryRef = await entriesRef.add(entryData);
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
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime
              value={date}
              onIonChange={(event) => setDate(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput
              value={title}
              onIonChange={(event) => setTitle(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel>
            <br></br>
            <input
              type="file"
              accept="image/*"
              onChange={handleOnChange}
              ref={fileInputRef}
            />
            <img
              src={pictureUrl}
              alt=""
              onClick={() => fileInputRef.current.click()}
            />
          </IonItem>
          <IonItem>
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

export default AddEntryPage;
