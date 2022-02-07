import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCheckbox,
    IonCol,
    IonContent,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonText,
    IonTextarea,
    IonTitle,
    IonToggle,
    IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
//import { CameraResultType, CameraSource, Plugins } from "@capacitor/core";
import { useHistory } from "react-router";
// import { useAuth } from "../Auth";
import { connect } from "react-redux";
import { arrowBackOutline as backIcon } from "ionicons/icons"

import { firestore } from "../firebase";
import { TestPlaceInput } from "../shared/testPlaceInput";
import './addEventPage.css'
import AccountPage from './AccountPage';

const AddTeamPage: React.FC = (props: any) => {
    //  const { userId } = useAuth() as any;
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState("")
    const [attendanceRequired, setAttendanceRequired] = useState(false)
    const [isMatch, setIsMatch] = useState(false)
    const [location, setLocation] = useState("")
    const [coordinance, setCoordinance] = useState()
    const attendingMembers = []
    const [createClub, setCreateClub] = useState(false);

    const result = ''

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
        const entriesRef = firestore
            .collection("teams")
            .doc(props.selectedTeam)
            .collection("events");
        let entryData = { date, title, description, startTime, endTime, attendanceRequired, isMatch, result, location, attendingMembers, coordinance };
        console.log(entryData)
        await entriesRef.add(entryData);
        history.goBack();
    };

    return (
        <IonPage>
            <IonRow>
                <IonHeader>
                    <IonToolbar>
                        <IonButton
                            color='none'
                            routerLink={'/teams'}
                        >
                            <IonIcon color="primary" className='sentIcon' icon={backIcon} size='small' slot="icon-only" ></IonIcon>
                        </IonButton>
                        <IonTitle>Adding a TEAM</IonTitle>
                    </IonToolbar>
                </IonHeader>
            </IonRow>
            <IonContent className="ion-padding">
                <IonText>
                    Do you want to add this team to an existing club or organization or create a new one?
                    <br />
                    <p>
                        Club can have a multiple teams, for example <IonText color="primary" >"New Town Rugby Club"</IonText>
                        can have
                        <IonText color="primary" > Boys U12, U14 </IonText>
                        and
                        <IonText color="primary" > Girls </IonText>teams.
                    </p>
                </IonText>
                <IonList>
                    <IonItem>
                        <IonLabel>Create a Club?</IonLabel>
                        <IonToggle color="primary" checked={createClub} onIonChange={(e) => setCreateClub(e.detail.checked)} />
                    </IonItem>

                    <IonItem lines="none">
                        <IonLabel position="stacked">Title</IonLabel>
                        <IonInput
                            value={title}
                            onIonChange={(event) => setTitle(event.detail.value)}
                        />
                    </IonItem>


                    <IonItem lines="none">
                        <IonLabel position="stacked">Description</IonLabel>
                        <IonTextarea
                            value={description}
                            onIonChange={(event) => setDescription(event.detail.value)}
                        />
                    </IonItem>

                    <IonItem lines="none">
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

                    <IonItem lines="none">
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
                        </IonCol>
                    </IonItem>
                    <IonButton expand="block" onClick={handleSave}>
                        Save
                    </IonButton>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

const mapStateToProps = (state) => ({
    currentUserId: state.auth.user.uid,
    selectedTeam: state.team.team,
});

export default connect(mapStateToProps, {})(AddTeamPage);
