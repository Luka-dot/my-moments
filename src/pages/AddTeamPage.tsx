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

import {
    addMemberToSpecificTeam,
    addMemberToSpecificTeamColection,
    addMemberToSpecificOrganizationColection
} from '../firebase';

import { firestore } from "../firebase";
import { TestPlaceInput } from "../shared/testPlaceInput";
import './addEventPage.css'
import AccountPage from './AccountPage';

const AddTeamPage: React.FC = (props: any) => {
    //  const { userId } = useAuth() as any;
    const history = useHistory();

    const [createClub, setCreateClub] = useState(false);
    const [clubName, setClubName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [teamInviteCode, setTeamInviteCode] = useState("");
    const [members, setMembers] = useState([]);

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
        const organizationRef = firestore
            .collection("organization")

        const teamRef = firestore
            .collection('teams')

        let teamData = { clubName, teamName, teamInviteCode, members };
        console.log('Adding team and Org ', teamData)
        if (createClub) {
            await organizationRef.add({ name: clubName, admin: props.currentUserId }).then((res) => {
                //    const newOrgRef = firestore.collection("organization").doc(res.id)
                addMemberToSpecificOrganizationColection(res.id, props.currentUser)
                teamRef.add({
                    name: teamName, invitationCode: teamInviteCode, organization: {
                        id: res.id,
                        name: clubName,
                        admin: props.currentUserId
                    }
                }).then((res) => {
                    console.log(res.id, props.currentUserId, props.currentUser)
                    addMemberToSpecificTeam(res.id, props.currentUserId)
                    addMemberToSpecificTeamColection(res.id, props.currentUser)
                    //    addMemberToSpecificOrganizationColection()
                })
            })
        } else {
            await teamRef.add({
                name: teamName, invitationCode: teamInviteCode
            }).then((res) => {
                console.log(res.id, props.currentUserId, props.currentUser)
                //  addMemberToSpecificTeam(res.id, props.currentUserId)
                //   addMemberToSpecificTeamColection(res.id, props.currentUser)
            })
        }

        history.goBack();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="teams" />
                    </IonButtons>
                    <IonTitle>Adding a TEAM</IonTitle>
                </IonToolbar>
            </IonHeader>
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
                    <IonItem lines="none">
                        <IonLabel>You are Admin of: Clayton Youth Rugby</IonLabel>
                    </IonItem>

                    <IonItem lines="none">
                        <IonLabel>Create a Club?</IonLabel>
                        <IonToggle color="primary" checked={createClub} onIonChange={(e) => setCreateClub(e.detail.checked)} />
                    </IonItem>
                    {
                        createClub ?
                            <IonItem >
                                <IonLabel position="stacked">Club/Organization Name</IonLabel>
                                <IonInput
                                    value={clubName}
                                    onIonChange={(event) => setClubName(event.detail.value)}
                                />
                            </IonItem>
                            :
                            <div></div>
                    }
                    <br />
                    <br />
                    <IonTitle>Team Information</IonTitle>
                    <IonItem lines="none">
                        <IonLabel position="stacked">Team Name</IonLabel>
                        <IonInput
                            value={teamName}
                            onIonChange={(event) => setTeamName(event.detail.value)}
                        />
                    </IonItem>

                    <IonItem lines="none">
                        <IonLabel position="stacked">Team Invitation Code</IonLabel>
                        <IonTextarea
                            value={teamInviteCode}
                            onIonChange={(event) => setTeamInviteCode(event.detail.value)}
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

const mapStateToProps = (state) => ({
    currentUser: state.auth.curentUserDetails,
    currentUserId: state.auth.user.uid,
    selectedTeam: state.team.team,
});

export default connect(mapStateToProps, {})(AddTeamPage);
