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
import { userSelectedTeam, getTeamMembers, selectedTeamData } from '../actions/TeamActions';
import { Redirect } from "react-router";
import { firestore } from "../firebase";

import "../appTab.css";

const TeamSelectionPage: React.FC = (props: any) => {
    const [teams, setTeams] = useState([])

    useEffect(() => {
        console.log('TEAM SELECTION')
        const docRef = firestore.collection('teams');
        docRef.get().then((snapshot) => {
            const teamsList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))

            setTeams(teamsList)
        })
    }, []);

    // useIonViewWillEnter(() => {
    //     console.log('TEAM SELECTION ION 87878 ', props.selectedTeam)
    //     if (props.selectedTeam) {
    //         <Redirect to={`/my/teams/team/${props.selectedTeam}`} />
    //     }
    // })

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
    }

    const handleCreate = () => {
        console.log('Make The TEAM')
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
                <p>Maybe start one?</p>
                <IonButton onClick={handleCreate}>Create Team</IonButton>
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

export default connect(mapStateToProps, { userSelectedTeam, getTeamMembers, selectedTeamData })(TeamSelectionPage);