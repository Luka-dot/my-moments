import {
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
} from "@ionic/react";
import {
  home as homeIcon,
  settings as settingsIcon,
  calendar as calendarIcon,
  chatbubbles as textIcon,
  person as contactsIcon,
} from "ionicons/icons";
import React from "react";

import { Route, Redirect } from "react-router-dom";

import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage";
import EntryPage from "./pages/EntryPage";
import AccountPage from "./pages/AccountPage";
import { useAuth } from "./Auth";
// import AddEntryPage from "./pages/tempAdd";
import { connect } from "react-redux";
import MembersPage from "./pages/MembersPage";
import TeamSelectionPage from "./pages/TeamSelectionPage";
import TeamPage from "./pages/TeamPage";
import AddEventPage from "./pages/AddEventPage";
import { EditModal } from "./shared/EditModel";
import EditPage from "./shared/EditPage";
import { resetSingleEntry } from './actions/EventsAction';
import { userSelectedTeam } from './actions/TeamActions';

const AppTab: React.FC = (props: any) => {
  const { loggedIn } = props.currentUser;
  const { selectedTeam } = props.selectedTeam;

  console.log('atttabs ', props)

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  const pathToTeamEvents = selectedTeam ? `/my/teams/team/:${selectedTeam}` : "/my/teams"

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* <Route exact path="/my/team">
          <TeamPage />
        </Route> */}
        <Route exact path="/my/teams">
          <TeamSelectionPage />
        </Route>
        <Route path="/my/account">
          <AccountPage />
        </Route>
        <Route exact path="/my/settings" component={SettingsPage} />
        <Route exact path="/my/entries/view/:id">
          {/*    /my/teams/team/:id/entries/view/:id */}
          <EntryPage />
        </Route>
        <Route exact path="/my/teams/team/:id">
          <TeamPage />
        </Route>
        <Route exact path="/my/members">
          <MembersPage />
        </Route>
        <Route exact path="/my/events/add">
          <AddEventPage />
        </Route>
        <Route exact path="/my/teams/team/:id/entries/view/edit/:id">
          <EditPage />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="top">
        <IonTabButton tab="events" href={pathToTeamEvents} >
          <IonIcon icon={calendarIcon} />
          <IonLabel>Events</IonLabel>
        </IonTabButton>
        <IonTabButton tab="login" href="/my/account">
          <IonIcon icon={textIcon} />
          <IonLabel>Messages</IonLabel>
        </IonTabButton>
        <IonTabButton tab="members" href="/my/members">
          <IonIcon icon={contactsIcon} />
          <IonLabel>Members</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
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
