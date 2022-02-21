import {
    IonContent,
    IonList,
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon,
    useIonViewDidEnter,
    useIonViewWillEnter,
    IonHeader,
    IonToolbar,
    IonTitle
} from "@ionic/react";
import { add as addIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import EntriesItem from '../components/EntriesItem';
import { getTeamEvents } from '../actions/TeamActions';
import { getTeamMembers, userSelectedTeam, getAttendance } from './../actions/TeamActions';
import { resetSingleEntry } from './../actions/EventsAction';

import OneSignal from 'onesignal-cordova-plugin';
import { isPlatform } from '@ionic/react';

import './teamPage.css';

const TeamPage: React.FC = (props: any) => {
    const [userIsAdmin, setUserIsAdmin] = useState<any>()

    if (isPlatform('ios') && isPlatform("android")) {
        OneSignal.setExternalUserId(props.currentUserId)
    }

    function isUserAdminCheck() {
        const checkingMember = props.teamMembers.filter(member => member.id === props.currentUser.userId)
        if (checkingMember[0]?.isAdmin === true) {
            return true
        }
    }

    // *********** New check for admin  **************************
    function isUserAdminCheck2() {
        console.log(props.teamOrganization.teamName.organization.admin, ' - ', props.currentUser.userId)
        const admins = props.teamOrganization.teamName.organization.admin
        const userIs = props.currentUser.userId
        if (admins === userIs) {
            return true
        }
    }

    // useEffect(() => {
    //     console.log(' ENTERED ENTERED ', props.teamOrganization.teamName.organization.admin)
    //     // props.resetSingleEntry()
    //     setUserIsAdmin(isUserAdminCheck2())
    // }, [])

    useEffect(() => {
        console.log('useEffect HAS  ENTERED ENTERED  ENTERED  ENTERED  ENTERED ENTERED ', props.selectedTeam)
        props.getTeamEvents(props.selectedTeam)

        //   props.getAttendance(props.userSelectedTeam, , props.currentUserId)
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
            {/* <IonHeader>
                <IonToolbar>
                    <IonTitle>{props.selectedTeamName.name}</IonTitle>
                </IonToolbar>
            </IonHeader> */}
            <IonContent className="ion-padding">
                {console.log(userIsAdmin)}
                {
                    isUserAdminCheck2() ?
                        <IonFab vertical="bottom" horizontal="end">
                            <IonFabButton routerLink={`/my/teams/team/${props.selectedTeam}/events/add`}>
                                <IonIcon icon={addIcon} />
                            </IonFabButton>
                        </IonFab>
                        :
                        <div><p>no admin button?</p></div>
                }
                <IonList className="entryList">
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
    selectedTeamName: state.team.teamName,
    teamEvents: state.team.events,
    teamMembers: state.team.members,
    teamOrganization: state.team,
});

export default connect(mapStateToProps, { getTeamEvents, getTeamMembers, resetSingleEntry, getAttendance })(TeamPage);
