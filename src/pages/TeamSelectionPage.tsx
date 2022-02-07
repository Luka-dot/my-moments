import {
    IonContent,
    IonList,
    IonPage,
    IonButton,
    IonCard,
    IonItem,
    IonText,
    IonRow,
    IonCol,
    IonHeader,
    IonInput,
    IonLabel,
    IonItemDivider,
    useIonPopover,
    IonListHeader
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { userSelectedTeam, getTeamMembers, selectedTeamData, getAttendance, createTeam, getUserAvailableTeams } from '../actions/TeamActions';
import { Redirect } from "react-router";
import { firestore, functions } from "../firebase";
import { TestPlaceInput } from '../shared/testPlaceInput'
import OneSignal from 'onesignal-cordova-plugin';

import "../appTab.css";
import { getCurrentUserDetails } from "../actions/AuthActions";
import { AddTeamModal } from "../shared/AddTeamModal";
import { CreationPopover } from '../components/CreationPopover';
import { isPlatform } from '@ionic/react';

const TeamSelectionPage: React.FC = (props: any) => {
    const [teams, setTeams] = useState<any>()
    const [creatingTeam, setCreatingTeam] = useState(false)
    const [teamCode, setTeamCode] = useState<any>()

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

    // const gettingTeamsList = async () => {
    //     // const docRef = firestore.collection('teams');
    //     // docRef.get().then((snapshot) => {
    //     //     const teamsList = snapshot.docs.map((doc) => ({
    //     //         id: doc.id,
    //     //         ...doc.data(),
    //     //     }))
    //     //     const filteredTeamsList = teamsList.filter((team) => {
    //     //         return team.id === props.currentUser.curentUserDetails.memberOfTeam[0]
    //     //     })
    //     //     setTeams(filteredTeamsList)
    //     // })
    // }

    useEffect(() => {
        console.log('TEAM SELECTION')
        props.getCurrentUserDetails(props.currentUserId)
        //   const funcCall = functions.httpsCallable('getAvailableTeamsForUser')
        //    setMyTeams(funcCall())
        // getUserAvailableTeams(props.currentUserId)
    }, []);

    useEffect(() => {
        props.getUserAvailableTeams(props.currentUserId)
    }, [props.currentUserId])

    useEffect(() => {
        setTeams(props.availableTeams)
    }, [props.availableTeams])

    // useEffect(() => {
    //     console.log(teams)

    // }, [teams])

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

    const handleJoinTeam = () => {
        console.log('joining team ', teamCode)
    }
    // const teamsToDisplay = teams.filter((team) => {

    //     props.currentUser.curentUserDetails.memberOfTeam.forEach(userTeam => {
    //         if (team.id === userTeam) {
    //             console.log('FOUND IT  ', team)
    //         }
    //     })
    // })

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
                <IonHeader>
                    <IonRow className="teamSelectionTitle">
                        <IonCol className="teamSelectionTitleCol" >
                            <IonText>You are logged in as: {props.currentUser.user.email} </IonText>
                        </IonCol>
                        <br />
                    </IonRow>
                    <IonRow className="teamSelectionTitle">
                        <IonCol className="teamSelectionTitleCol" >
                            <IonText>Member of: </IonText>
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
                <br />

                <IonRow >
                    {/* <IonText>Create a new Team or Club</IonText>
                    <IonButton
                        color="tertiary"
                        size="small"
                        onClick={(e) =>
                            present({
                                event: e.nativeEvent,
                            })
                        }
                    // onClick={handleCreate} 
                    >+</IonButton> */}
                    <IonButton
                        routerLink={`addTeam`}
                    >Add</IonButton>
                    <CreationPopover />
                </IonRow>

                <IonItemDivider color="white" />
                <IonList>
                    <IonLabel>Join existing team</IonLabel>
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
                </IonList>
            </IonContent>
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