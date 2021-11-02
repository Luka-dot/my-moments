import {
    IonContent,
    IonList,
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon,
    useIonViewDidEnter,
    useIonViewWillEnter
} from "@ionic/react";
import { add as addIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import EntriesItem from '../components/EntriesItem';
import { getTeamEvents } from '../actions/TeamActions';
import { getTeamMembers, userSelectedTeam } from './../actions/TeamActions';
import { resetSingleEntry } from './../actions/EventsAction';

const TeamPage: React.FC = (props: any) => {

    function isUserAdminCheck() {
        const checkingMember = props.teamMembers.filter(member => member.id === props.currentUser.userId)
        if (checkingMember[0].isAdmin === true) {
            return true
        }
    }

    useIonViewWillEnter(() => {
        console.log('I O N VIEW HAS  ENTERED ENTERED  ENTERED  ENTERED  ENTERED ENTERED ', props.selectedTeam)
        // props.resetSingleEntry()
    })

    useEffect(() => {
        console.log('useEffect HAS  ENTERED ENTERED  ENTERED  ENTERED  ENTERED ENTERED ', props.selectedTeam)
        props.getTeamEvents(props.selectedTeam)
    }, [props.selectedTeam]);

    // useEffect(() => {
    //     console.log("RESTTINNGGGGGGG JHGFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFJK")
    //     props.resetSingleEntry()
    // })

    if (!props.teamEvents) {
        return (
            <div>Loading....</div>
        )
    }

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h3>TEAM PAGE</h3>
                {
                    isUserAdminCheck() ?
                        <IonFab vertical="bottom" horizontal="end">
                            <IonFabButton routerLink={`/my/teams/team/${props.selectedTeam}/events/add`}>
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

export default connect(mapStateToProps, { getTeamEvents, getTeamMembers, resetSingleEntry })(TeamPage);
