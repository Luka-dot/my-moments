import {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonIcon,
} from "@ionic/react";
import { add as addIcon } from "ionicons/icons";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import EntriesItem from '../components/EntriesItem';
import { getTeamEvents } from '../actions/TeamActions';

const HomePage: React.FC = (props: any) => {

    useEffect(() => {
        console.log('useEffect LOG')
        props.getTeamEvents(props.selectedTeam)
    }, [props.selectedTeam]);

    //  firestore.collection('users').doc(props.currentUserId).collection("entries").get().then(snaphot => { console.log(snaphot) });

    if (!props.teamEvents) {
        return (
            <div>Loading....</div>
        )
    }

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h3>TEAM PAGE</h3>
                <IonList>

                </IonList>
                <p>we will have something soon ...</p>
                <button onClick={() => props.getTeamEvents(props.selectedTeam)}>Get Events</button>
            </IonContent>

        </IonPage>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.auth,
    currentUserId: state.auth.user.uid,
    selectedTeam: state.team.team,
    teamEvents: state.team.events
});

export default connect(mapStateToProps, { getTeamEvents })(HomePage);