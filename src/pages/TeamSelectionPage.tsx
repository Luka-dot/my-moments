import {
    IonContent,
    IonList,
    IonPage,
    IonButton,
    IonCard,
    IonItem
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMemoriesForUser } from '../actions/MemoriesAction';
import { Redirect } from "react-router";
import { firestore } from "../firebase";

const TeamSelectionPage: React.FC = (props: any) => {
    const [teams, setTeams] = useState([])

    useEffect(() => {
        const docRef = firestore.collection('teams');
        docRef.get().then((snapshot) => {
            const teamsList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))

            setTeams(teamsList)
        })
    }, []);

    if (!teams) {
        return (
            <div>Loading....</div>
        )
    }

    const handleCreate = () => {
        console.log('Make The TEAM')
    }

    if (!props.userLoggedIn) {
        return (
            <Redirect to="/login" />
        )
    }

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <p>Select a team for user: {props.currentUser.user.email} </p>
                <br />
                <IonList>
                    {teams.map((team) =>
                        <IonItem
                            button
                            key={team.id}
                            routerLink={`/my/teams/team/${team.id}`}
                        >
                            <IonCard>
                                <p>{team.name}</p>
                            </IonCard>
                        </IonItem>
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
    memories: state.memories.memories,
    userLoggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps, { getMemoriesForUser })(TeamSelectionPage);