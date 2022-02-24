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
    IonText,
    IonTextarea,
    IonTitle,
    IonToggle,
    IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
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
import { toEntry } from "../Models";

const AddTeamPage: React.FC = (props: any) => {
    const history = useHistory();

    const [createClub, setCreateClub] = useState(false);
    const [clubName, setClubName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [teamInviteCode, setTeamInviteCode] = useState("");
    const [checkingAdmin, setCheckingAdmin] = useState([])
    const [checkingOrgAdmin, setCheckingOrgAdmin] = useState([])


    let adminOf = [];

    // **************** Adding Pictures *********************
    // const [pictureUrl, setPictureUrl] = useState("/assets/placeholder.png");
    // const fileInputRef = useRef<HTMLInputElement>();

    // useEffect(() => {
    //     return () => {
    //         if (pictureUrl.startsWith("blob:")) {
    //             URL.revokeObjectURL(pictureUrl);
    //         }
    //     };
    // }, [pictureUrl]);

    const checkAdminOf = async () => {
        const teamsRef = firestore.collection('teams')
        console.log(teamsRef)
        await teamsRef.where('teamAdmins', 'array-contains-any', [props.currentUserId]).get().then((docs) => {
            return setCheckingAdmin(docs.docs.map(toEntry))
        })
    }

    const checkOrgAdmin = async () => {
        const orgRef = firestore.collection('organization')
        await orgRef.where('orgAdmin', 'array-contains-any', [props.currentUserId]).get().then((docs) => {
            return setCheckingOrgAdmin(docs.docs.map(toEntry))
        })
    }

    useEffect(() => {
        //    checkAdminOf()
        checkOrgAdmin()
    }, [])


    const handleSave = async () => {
        const organizationRef = firestore
            .collection("organization")

        const teamRef = firestore
            .collection('teams')

        if (createClub) {
            await organizationRef.add({ name: clubName, admin: props.currentUserId }).then((res) => {
                addMemberToSpecificOrganizationColection(res.id, props.currentUser)
                organizationRef.doc(res.id).update({ uid: res.id, orgAdmin: [props.currentUserId] })
                teamRef.add({
                    name: teamName, invitationCode: teamInviteCode,
                    teamAdmins: [props.currentUserId], organization: {
                        id: res.id,
                        name: clubName,
                        admin: props.currentUserId
                    }
                }).then((res) => {
                    console.log(res.id, props.currentUserId, props.currentUser)
                    // res.id is an id of new team, need to be added to this doc
                    teamRef.doc(res.id).update({ uid: res.id })
                    addMemberToSpecificTeam(res.id, props.currentUserId)
                    addMemberToSpecificTeamColection(res.id, props.currentUser)
                })   //.then(() => props.getUserAvailableTeams(props.currentUserId))
            })
        } else {
            await teamRef.add({
                name: teamName, invitationCode: teamInviteCode
            }).then((res) => {
                console.log(res.id, props.currentUserId, props.currentUser)
            })
        }
        history.goBack();
    };

    const renderOrgList = () => {
        return checkingOrgAdmin.map((org) =>
            <IonItem lines="none">
                <IonCheckbox key={org.name} color="secondary" value={org.name} checked={false} />
                <IonText >{org.name}</IonText>
            </IonItem>
        )
    }

    // {checkingOrgAdmin[1]?.name}
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
                    <p>
                        Club can have a multiple teams, for example <IonText color="primary" >"New Town Rugby Club"</IonText>
                        can have
                        <IonText color="primary" > Boys U12, U14 </IonText>
                        and
                        <IonText color="primary" > Girls </IonText>teams.
                    </p>
                    <IonText className="description">Do you want to add this team to an existing club or organization or create a new one?</IonText>
                </IonText>
                <IonList>
                    {console.log(checkingOrgAdmin)}
                    {checkingOrgAdmin.length === 0 ?
                        <IonItem lines="none">
                            <IonLabel>Create a NEW Club?</IonLabel>
                            <IonToggle color="primary" checked={createClub} onIonChange={(e) => setCreateClub(e.detail.checked)} />
                        </IonItem>
                        :
                        <IonItem lines="none">
                            <IonCol>
                                <IonText><h5>You are Admin of: {checkingOrgAdmin.length} Organizations</h5></IonText>
                                {renderOrgList()}
                                <IonItem lines="none">
                                    <IonCheckbox key={'nullValue'} color="secondary" value={'nullValue'} checked={false} />
                                    <IonText >None</IonText>
                                </IonItem>
                                <IonItem lines="none">
                                    <IonCheckbox key={'newValue'} color="secondary" value={'newValue'} checked={false} />
                                    <IonText >New Organization</IonText>
                                </IonItem>
                                <br />
                                <IonText className="description">Select an organization you want to add new team under. Or select "none" or "new"</IonText>
                            </IonCol>
                        </IonItem>
                    }
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
