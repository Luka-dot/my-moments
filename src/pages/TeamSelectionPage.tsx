import {
    IonContent,
    IonList,
    IonButton,
    IonCard,
    IonItem,
    IonText,
    IonRow,
    IonCol,
    IonInput,
    IonLabel,
    IonFooter,
    IonToolbar
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { userSelectedTeam, getTeamMembers, selectedTeamData, getAttendance, createTeam, getUserAvailableTeams } from '../actions/TeamActions';
import { Redirect } from "react-router";

import OneSignal from 'onesignal-cordova-plugin';
import {
    firestore,
    addMemberToSpecificTeam,
    addMemberToSpecificOrganizationColection,
    addMemberToSpecificTeamColection
} from '../firebase';

import "../appTab.css";
import { getCurrentUserDetails } from "../actions/AuthActions";
import { AddTeamModal } from "../shared/AddTeamModal";
import { CreationPopover } from '../components/CreationPopover';
import { isPlatform, IonPage } from '@ionic/react';
import { toEntry } from "../Models";

const TeamSelectionPage: React.FC = (props: any) => {
    const [teams, setTeams] = useState<any>()
    const [creatingTeam, setCreatingTeam] = useState(false)
    const [teamCode, setTeamCode] = useState<any>()
    const [codeErrorMessage, setCodeErrorMessage] = useState('')

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

    useEffect(() => {
        props.getCurrentUserDetails(props.currentUserId)
    }, []);

    useEffect(() => {
        props.getUserAvailableTeams(props.currentUserId)
    }, [props.currentUserId])

    useEffect(() => {
        setTeams(props.availableTeams)
    }, [props.availableTeams])

    useEffect(() => {
        setCodeErrorMessage('')
    }, [teamCode])

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
        props.userSelectedTeam(teamId)
        props.getTeamMembers(teamId)
        props.selectedTeamData(teamId)
    }

    const cancelCreating = () => {
        setCreatingTeam(!creatingTeam)
    }

    const handleCreating = (name) => {
        props.createTeam(props.currentUserId, name, props.currentUser.curentUserDetails)
        firestore.collection('teams')
        setCreatingTeam(!creatingTeam)
    }

    const findTeamByCode = async (teamCode) => {
        const teamsRef = firestore.collection('teams')
        const teamCodeQuery = teamsRef.where('invitationCode', "==", teamCode)
        const locatedTeam = await teamCodeQuery.get().then((docRef) => { return (docRef.docs.map(toEntry)) })
        return locatedTeam
    }

    const existingMemberCheck = (list, id) => {
        const existingMember = list.find(el => el === id)
        if (existingMember) return true
    }

    const handleJoinTeam = async () => {
        findTeamByCode(teamCode).then(data => {
            if (data.length > 0) {
                // check if this user is already a member
                if (existingMemberCheck(props.currentUser.curentUserDetails.memberOfTeam, data[0].id) === true) {
                    console.log('already a member')
                    setCodeErrorMessage('Already a member')
                    return
                }

                // check if the team is part of the organization
                if (data[0].organization) {
                    addMemberToSpecificTeam(data[0].id, props.currentUserId)
                    addMemberToSpecificOrganizationColection(data[0].organization.id, props.currentUser.curentUserDetails)
                }
                // adding member to a team
                addMemberToSpecificTeamColection(data[0].id, props.currentUser.curentUserDetails)
            }
            setCodeErrorMessage('Team Not Found')
        })
        setTeamCode('')

    }

    const teamsListFiltered = teams.filter((el) => {
        return props.currentUser.curentUserDetails.memberOfTeam.some((f) => {
            //    console.log('/*/*/*/* ', f, el.id)
            if (f === el.id) {
                return el
            };
        });
    });

    return (
        <IonPage>
            <IonContent className="ion-padding" >

                <AddTeamModal
                    modalText={"Adding TEAM !!!"}
                    displayModal={creatingTeam}
                    onCancel={cancelCreating}
                    onConfirm={handleCreating}
                />
                <IonCol>
                    <IonRow >
                        <IonCol >
                            <IonCard  >
                                <IonLabel className="label" color="tertiary" >Join existing team</IonLabel>
                                <IonRow>
                                    <IonInput
                                        placeholder="enter invite code"
                                        value={teamCode}
                                        onIonChange={(e) => { setTeamCode(e.detail.value) }}
                                        clearInput
                                    />
                                    <IonButton
                                        onClick={handleJoinTeam}
                                        size="small"
                                        color="tertiary"
                                    >Join Team</IonButton>
                                </IonRow>
                                <IonText className="label" color="danger">{codeErrorMessage}</IonText>
                            </IonCard>
                            <br />
                            <IonRow>
                                <IonCol className="teamSelectionTitleCol"  >
                                    <IonText>Or select a team.</IonText>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <IonList>
                        {teamsListFiltered.map((team) =>
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
                </IonCol>
                <br />
            </IonContent>
            <IonFooter  >
                <IonToolbar className="footerItem" >
                    <IonRow id="footerButton" className="ion-justify-content-end" >
                        <CreationPopover />
                        <IonButton
                            routerLink={`addTeam`}
                        >Add</IonButton>
                    </IonRow>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.auth,
    currentUserId: state.auth.user.uid,
    selectedTeam: state.team.team,
    userLoggedIn: state.auth.loggedIn,
    availableTeams: state.team.userAvaileTeams,
});

export default connect(mapStateToProps,
    {
        userSelectedTeam, getTeamMembers, selectedTeamData,
        getAttendance, getCurrentUserDetails, createTeam, getUserAvailableTeams
    })(TeamSelectionPage);