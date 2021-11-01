import {
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
} from "@ionic/react";
import {
  settings as settingsIcon,
  calendar as calendarIcon,
  chatbubbles as textIcon,
  person as contactsIcon,
} from "ionicons/icons";
import React from "react";

import { Route, Redirect } from "react-router-dom";

import SettingsPage from "./pages/SettingsPage";
import EntryPage from "./pages/EntryPage";
import AccountPage from "./pages/AccountPage";
import { connect } from "react-redux";
import MembersPage from "./pages/MembersPage";
import TeamSelectionPage from "./pages/TeamSelectionPage";
import TeamPage from "./pages/TeamPage";
import AddEventPage from "./pages/AddEventPage";
import EditPage from "./shared/EditPage";

const AppTab: React.FC = (props: any) => {
  const { loggedIn } = props.currentUser;

  // useIonViewWillEnter(() => {
  //   console.log('TEAM SELECTION ION 2', props.selectedTeam)
  //   setCurrentTeam(props.selectedTeam.team)
  // })

  // useIonViewWillEnter(() => {
  //   console.log('Ion effect in AppTabs')
  //   setCurrentTeam(selectedTeam)
  // })

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  if (!props.selectedTeam.team) {
    return (
      <div>.. LOADING ...</div>
    )
  }

  console.log(props.selectedTeam.team)
  const pathToTeamEvents = `/my/teams/team/${props.selectedTeam.team}`

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* <Route exact path="/my/team">
          <TeamPage />
        </Route> */}
        {/* <Route exact path="/my/teams">
          <TeamSelectionPage />
        </Route> */}
        <Route exact path="/teams">
          <TeamSelectionPage />
        </Route>
        <Route path="/my/teams/account">
          <AccountPage />
        </Route>
        <Route exact path="/my/teams/settings" component={SettingsPage} />
        <Route exact path="/my/teams/team/:id/entries/view/:id">
          {/*    /my/teams/team/:id/entries/view/:id    /my/entries/view/:id  */}
          <EntryPage />
        </Route>
        <Route exact path="/my/teams/team/:id">
          <TeamPage />
        </Route>
        <Route exact path="/my/teams/members">
          <MembersPage />
        </Route>
        <Route exact path="/my/teams/events/add">
          <AddEventPage />
        </Route>
        <Route exact path="/my/teams/team/:id/entries/:id/edit">
          <EditPage />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="top">
        <IonTabButton tab="events" href={pathToTeamEvents} >
          <IonIcon icon={calendarIcon} />
          <IonLabel>Events</IonLabel>
        </IonTabButton>
        <IonTabButton tab="login" href="/my/teams/account">
          <IonIcon icon={textIcon} />
          <IonLabel>Messages</IonLabel>
        </IonTabButton>
        <IonTabButton tab="members" href="/my/teams/members">
          <IonIcon icon={contactsIcon} />
          <IonLabel>Members</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/teams/settings">
          <IonIcon icon={settingsIcon} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth,
  selectedTeam: state.team,
});

export default connect(mapStateToProps, null)(AppTab);
