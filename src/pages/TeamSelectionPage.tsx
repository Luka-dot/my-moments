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
    IonToolbar,
    useIonViewWillEnter
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    userSelectedTeam,
    getTeamMembers,
    selectedTeamData,
    getAttendance,
    createTeam,
    getUserAvailableTeams
} from '../actions/TeamActions';
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
import TeamCard from "../components/teamCard";

const TeamSelectionPage: React.FC = (props: any) => {
    const [creatingTeam, setCreatingTeam] = useState(false)
    const [teamCode, setTeamCode] = useState<any>()
    const [codeErrorMessage, setCodeErrorMessage] = useState('')
    const [teamsFiltered, setTeamsFiltered] = useState<any>([{}])

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
        setTeamsFiltered(props.getUserAvailableTeams(props.currentUserId))
    }, []);

    useEffect(() => {
        setTeamsFiltered(props.getUserAvailableTeams(props.currentUserId))
    }, [props.currentUser.curentUserDetails.memberOfTeam]);

    // useEffect(() => {
    //     const fetchingData = async () => {
    //         try {
    //             const response = getUserAvailableTeams(props.currentUser.curentUserDetails.memberOfTeam)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }

    //     fetchingData()
    // }, [props.currentUser.curentUserDetails.memberOfTeam])

    // useEffect(async () => {
    //     props.getUserAvailableTeams(props.currentUser.curentUserDetails.memberOfTeam)
    // }, [props.currentUser.curentUserDetails.memberOfTeam])

    // useEffect(() => {
    //     setTeams(props.availableTeams)
    // }, [props.availableTeams])

    useEffect(() => {
        setCodeErrorMessage('')
    }, [teamCode])

    if (!props.userLoggedIn) {
        return (
            <Redirect to="/" />
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
            console.log('joining team ', teamCode, data)
            if (data.length > 0) {
                // check if this user is already a member
                console.log('date.length is > 0')
                if (existingMemberCheck(props.currentUser.curentUserDetails.memberOfTeam, data[0].id) === true) {
                    console.log('already a member')
                    setCodeErrorMessage('Already a member')
                    return
                }
                // adding member to a team
                console.log('start adding to ', data[0].id)
                addMemberToSpecificTeamColection(data[0].id, props.currentUser.curentUserDetails)
                // check if the team is part of the organization
                if (data[0].organization) {
                    addMemberToSpecificTeam(data[0].id, props.currentUserId)
                    addMemberToSpecificOrganizationColection(data[0].organization.id, props.currentUser.curentUserDetails)
                }
                setTeamsFiltered(props.getUserAvailableTeams(props.currentUserId))
            } else {
                setCodeErrorMessage('Team Not Found')
            }
        })
        setTeamCode('')
    }

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
                    <TeamCard handleSelectTeam={handleSelectTeam} />
                    {/* {teamsFiltered.map((team) =>
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
                        )} */}
                    {/* {teamsFiltered.map((team, index) => {
                            return (
                                <IonCard key={team.id}>
                                    <IonItem
                                        lines="none"
                                        button
                                        onClick={() => handleSelectTeam(team.id)}
                                        routerLink={`/my/teams/team/${team.id}`}
                                    >
                                        <p>{team.name}</p>
                                    </IonItem>
                                </IonCard>)
                        }
                        )} */}
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