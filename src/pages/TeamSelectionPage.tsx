import {
    IonContent,
    IonList,
    IonPage,
    IonButton,
    IonCard,
    IonItem,
    useIonViewWillEnter,
    IonText,
    IonRow,
    IonCol,
    IonHeader
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { userSelectedTeam, getTeamMembers, selectedTeamData, getAttendance, createTeam } from '../actions/TeamActions';
import { Redirect } from "react-router";
import { firestore } from "../firebase";
import { TestPlaceInput } from '../shared/testPlaceInput'
import OneSignal from 'onesignal-cordova-plugin';

import "../appTab.css";
import { getCurrentUserDetails } from "../actions/AuthActions";
import { AddTeamModal } from "../shared/AddTeamModal";
import { isPlatform } from '@ionic/react';



const TeamSelectionPage: React.FC = (props: any) => {
    const [teams, setTeams] = useState([])
    const [creatingTeam, setCreatingTeam] = useState(false)

    if (isPlatform('ios') && isPlatform("android")) {
        const runOneSignal = function OneSignalInit(): void {
            // Uncomment to set OneSignal device logging to VERBOSE  
            // OneSignal.setLogLevel(6, 0);

            // NOTE: Update the setAppId value below with your OneSignal AppId.
            OneSignal.setAppId("fb954bfe-7d60-443d-a7dd-695ffd616880");
            OneSignal.setNotificationOpenedHandler(function (jsonData) {
                console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
            });

            // iOS - Prompts the user for notification permissions.
            //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
            OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
                console.log("User accepted notifications: " + accepted);
            });
        }
        runOneSignal()
        OneSignal.setExternalUserId(props.currentUserId)
    }

    const gettingTeamsList = () => {
        const docRef = firestore.collection('teams');
        docRef.get().then((snapshot) => {
            const teamsList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))

            setTeams(teamsList)
        })
    }

    useEffect(() => {
        console.log('TEAM SELECTION')
        gettingTeamsList()
        props.getCurrentUserDetails(props.currentUserId)
    }, []);

    useEffect(() => {
        gettingTeamsList()
    }, [creatingTeam])

    if (!props.userLoggedIn) {
        return (
            <Redirect to="/" />
        )
    }

    if (!teams) {
        return (
            <div>Loading....</div>
        )
    }

    const handleSelectTeam = (teamId) => {
        props.userSelectedTeam(teamId);
        props.getTeamMembers(teamId)
        props.selectedTeamData(teamId)
        //    props.getAttendance(teamId, props.currentUser.uid)
    }

    const handleCreate = () => {
        console.log('add team')
        setCreatingTeam(!creatingTeam)
    }

    const cancelCreating = () => {
        setCreatingTeam(!creatingTeam)
    }

    const handleCreating = (name) => {
        console.log('creating')
        props.createTeam(props.currentUserId, name, props.currentUser.curentUserDetails)
        // firestore.collection('teams').add({
        //     name: name, admin: props.currentUserId,
        // })
        firestore.collection('teams')
        setCreatingTeam(!creatingTeam)
    }

    return (
        <IonPage>
            <IonContent className="ion-padding" >
                <IonHeader>
                    <IonRow className="teamSelectionTitle">
                        <IonCol className="teamSelectionTitleCol" >
                            <IonText>You are logged in as: {props.currentUser.user.email} </IonText>
                        </IonCol>
                        <br />
                    </IonRow>
                    <AddTeamModal
                        modalText={"Adding TEAM !!!"}
                        displayModal={creatingTeam}
                        onCancel={cancelCreating}
                        onConfirm={handleCreating}
                    />
                    <IonRow>
                        <IonCol className="teamSelectionTitleCol"  >
                            <IonText >Select a team.</IonText>
                        </IonCol>
                    </IonRow>
                </IonHeader>
                <br />
                <IonList>
                    {teams.map((team) =>
                        <IonCard key={team.id}>
                            <IonItem
                                lines="none"
                                button
                                onClick={() => handleSelectTeam(team.id)}
                                routerLink={`/my/teams/team/${team.id}`}
                            >
                                <p>{team.name}</p>
                            </IonItem>
                        </IonCard>
                    )}
                </IonList>
                <br />
                {props.currentUser.curentUserDetails?.isAdmin === true ?
                    <div>
                        <p>Maybe start one?</p>
                        <IonButton onClick={handleCreate} >Create Team</IonButton>
                    </div>
                    :
                    <div></div>
                }
                <p>Join existing team</p>
                <IonButton onClick={handleCreate}>Join Team</IonButton>
            </IonContent>
        </IonPage>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.auth,
    currentUserId: state.auth.user.uid,
    selectedTeam: state.team.team,
    userLoggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps,
    { userSelectedTeam, getTeamMembers, selectedTeamData, getAttendance, getCurrentUserDetails, createTeam })(TeamSelectionPage);