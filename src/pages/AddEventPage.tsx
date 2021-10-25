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

const AddEventPage: React.FC = (props: any) => {
    //  const { userId } = useAuth() as any;
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    // const [pictureUrl, setPictureUrl] = useState("/assets/placeholder.png");
    // const fileInputRef = useRef<HTMLInputElement>();

    // useEffect(() => {
    //     return () => {
    //         if (pictureUrl.startsWith("blob:")) {
    //             URL.revokeObjectURL(pictureUrl);
    //         }
    //     };
    // }, [pictureUrl]);

    const handleSave = async () => {
        console.log('saving entry ', props.currentUserId)
        const entriesRef = firestore
            .collection("users")
            .doc(props.currentUserId)
            .collection("entries");
        const entryData = { date, title, description };
        console.log(entryData)
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
                    <IonTitle>ADD EVENT !!!!!!!!</IonTitle>
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

export default connect(mapStateToProps, {})(AddEventPage);
