import {
    IonContent,
    IonList,
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon,
} from "@ionic/react";
import { add as addIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import EntriesItem from '../components/EntriesItem';
import { getTeamEvents } from '../actions/TeamActions';
import { formatDate } from './../utils/helpers';
import EntryPage from "./EntryPage";
import { getTeamMembers, userSelectedTeam } from './../actions/TeamActions';

const HomePage: React.FC = (props: any) => {
    const [isUserAdmin, setIsUserAdmin] = useState(false)

    function isUserAdminCheck() {
        console.log(props.teamMembers)
        const checkingMember = props.teamMembers.filter(member => member.id === props.currentUser.userId)
        console.log(checkingMember)
        if (checkingMember[0].isAdmin === true) {
            return true
        }
    }

    useEffect(() => {
        props.getTeamEvents(props.selectedTeam)
    }, [props.selectedTeam]);

    useEffect(() => {
    }, [])

    if (!props.teamEvents) {
        return (
            <div>Loading....</div>
        )
    }
    console.log(props.teamMembers)

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h3>TEAM PAGE</h3>
                {/* <IonList>
                    {props.teamEvents.map((event) => (
                        <IonItem key={event.id}>
                            <IonTitle>{event.title}</IonTitle>
                            <IonText>{formatDate(event.date)}</IonText>
                        </IonItem>
                    ))}
                </IonList> */}

                <button onClick={() => props.getTeamEvents(props.selectedTeam)}>Get Events</button>
                {
                    isUserAdminCheck() ?
                        <IonFab vertical="bottom" horizontal="end">
                            <IonFabButton routerLink="/my/events/add">
                                <IonIcon icon={addIcon} />
                            </IonFabButton>
                        </IonFab>
                        :
                        <div></div>
                }
                <IonList>
                    <EntriesItem />
                </IonList>
            </IonContent>
        </IonPage>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.auth,
    currentUserId: state.auth.user.uid,
    selectedTeam: state.team.team,
    teamEvents: state.team.events,
    teamMembers: state.team.members,
});

export default connect(mapStateToProps, { getTeamEvents, getTeamMembers })(HomePage);