import React, { useState, useEffect } from 'react';
import { firestore } from "../firebase";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { IonModal, IonButton, IonRow, IonCol, IonText, IonCheckbox, IonItem, IonList, IonContent, IonTextarea, IonLabel, IonInput, IonDatetime, IonPage } from '@ionic/react';

interface modalProps {
    modalText: string,
    displayModal: boolean,
    onCancel: any,
    onConfirm: any,
    eventDetails: any,
    teamId: any,
    eventId: any,
}

interface RouterParams {
    id: string;
}

const EditPage: React.FC = (props: any) => {
    const eventDetails = props.singleEntry

    const history = useHistory();
    const { id } = useParams<RouterParams>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('')
    const [attendanceRequired, setAttendanceRequired] = useState(Boolean)
    const [isMatch, setIsMatch] = useState(Boolean)
    const [result, setResult] = useState('')

    useEffect(() => {
        setTitle(eventDetails?.title);
        setDescription(eventDetails?.description);
        setDate(eventDetails?.date);
        setStartTime(eventDetails?.startTime);
        setEndTime(eventDetails?.endTime)
        setAttendanceRequired(eventDetails?.attendanceRequired)
        setIsMatch(eventDetails?.isMatch)
        setResult(eventDetails?.result)
    }, [])

    const handleSave = async () => {
        const entriesRef = firestore
            .collection("teams")
            .doc(props.selectedTeam)
            .collection("events")
            .doc(id);
        let entryData = { date, title, description, startTime, endTime, attendanceRequired, isMatch, result };
        await entriesRef.update(entryData);
        // onCancel();
    };
    const onConfirm = () => {
        handleSave()
        history.goBack()
    }
    const onCancel = () => {
        history.goBack()
    }

    if (!eventDetails) {
        return (
            <div>Loading....</div>
        )
    }

    return (
        <IonPage>
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
                </IonList>
            </IonContent>

        </IonPage>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.auth,
    currentUserId: state.auth.user.uid,
    selectedTeam: state.team.team,
    teamEvents: state.team.events,
    teamMembers: state.team.members,
    singleEntry: state.team.singleEvent,
});

export default connect(mapStateToProps, null)(EditPage)