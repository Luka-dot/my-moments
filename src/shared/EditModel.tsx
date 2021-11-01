import React, { useState } from 'react';
import { firestore } from "../firebase";
import { IonModal, IonButton, IonCard, IonRow, IonCol, IonGrid, IonText, IonCheckbox, IonItem, IonList, IonContent, IonTextarea, IonLabel, IonInput, IonDatetime, IonPage } from '@ionic/react';

interface modalProps {
    modalText: string,
    displayModal: boolean,
    onCancel: any,
    onConfirm: any,
    eventDetails: any,
    teamId: any,
    eventId: any,
}

export const EditModal = ({ modalText, displayModal, onCancel, onConfirm, eventDetails, teamId, eventId }: modalProps) => {

    const [title, setTitle] = useState(eventDetails.title);
    const [description, setDescription] = useState(eventDetails.description);
    const [date, setDate] = useState(eventDetails.date);
    const [startTime, setStartTime] = useState(eventDetails.startTime);
    const [endTime, setEndTime] = useState(eventDetails.endTime)
    const [attendanceRequired, setAttendanceRequired] = useState(eventDetails.attendanceRequired)
    const [isMatch, setIsMatch] = useState(eventDetails.isMatch)
    const [result, setResult] = useState(eventDetails.result)

    const handleSave = async () => {
        const entriesRef = firestore
            .collection("teams")
            .doc(teamId)
            .collection("events")
            .doc(eventId);
        let entryData = { date, title, description, startTime, endTime, attendanceRequired, isMatch, result };
        await entriesRef.update(entryData);
        onCancel();
    };

    return (
        <IonModal
            isOpen={displayModal}
        >
            <IonPage>
                <h4>{modalText}</h4>
                <IonContent className="ion-padding">
                    <IonList>
                        <IonItem>
                            <IonLabel >Date</IonLabel>
                            <IonDatetime
                                placeholder="Select Date"
                                value={date}
                                min="2021"
                                max="2050-10-30"
                                onIonChange={(event) => setDate(event.detail.value)}
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                Start Time
                            </IonLabel>
                            <IonDatetime
                                placeholder="Select Start Time"
                                pickerFormat="h:mm A"
                                displayFormat="h:mm A"
                                value={startTime}
                                onIonChange={(e) => setStartTime(e.detail.value)}
                            ></IonDatetime>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                End Time
                            </IonLabel>
                            <IonDatetime
                                placeholder="Select End Time"
                                pickerFormat="h:mm A"
                                displayFormat="h:mm A"
                                value={endTime}
                                onIonChange={(e) => setEndTime(e.detail.value)}
                            ></IonDatetime>
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

                        <IonItem>
                            <IonCol>
                                <IonRow>
                                    <IonCol size="10">
                                        <IonText >
                                            <h4>Attendance Required?</h4>
                                        </IonText>
                                    </IonCol>
                                    <IonCol size="2">
                                        <IonCheckbox
                                            checked={attendanceRequired}
                                            onIonChange={() => setAttendanceRequired(!attendanceRequired)}
                                        />
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonItem>

                        <IonItem>
                            <IonCol>
                                <IonRow>
                                    <IonCol size="10">
                                        <IonText >
                                            <h4>Is this a Match?</h4>
                                        </IonText>
                                    </IonCol>
                                    <IonCol size="2">
                                        <IonCheckbox
                                            checked={isMatch}
                                            onIonChange={() => setIsMatch(!isMatch)}
                                        />
                                    </IonCol>
                                </IonRow>
                                {
                                    isMatch ?
                                        <IonRow>
                                            <IonLabel >Result</IonLabel>
                                            <IonTextarea
                                                value={result}
                                                onIonChange={(event) => setResult(event.detail.value)}
                                            />
                                        </IonRow>
                                        :
                                        <div></div>
                                }

                            </IonCol>
                        </IonItem>
                        <IonRow>
                            <IonCol>
                                <IonButton fill="outline" color="danger" onClick={onConfirm} >CONFIRM</IonButton>
                            </IonCol>
                            <IonCol></IonCol>
                            <IonCol>
                                <IonButton fill="outline" onClick={onCancel}>CANCEL</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonButton expand="block" onClick={handleSave}>
                            Save
                        </IonButton>
                    </IonList>
                </IonContent>

            </IonPage>
        </IonModal>
    );
};