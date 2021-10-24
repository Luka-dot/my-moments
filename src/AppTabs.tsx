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
import AddEntryPage from "./pages/AddEntryPage";
import { connect } from "react-redux";
import MembersPage from "./pages/MembersPage";

const AppTab: React.FC = (props: any) => {
  const { loggedIn } = props.currentUser;

  console.log('atttabs ', props)

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/my/entries">
          <HomePage />
        </Route>
        <Route path="/my/account">
          <AccountPage />
        </Route>
        <Route exact path="/my/settings" component={SettingsPage} />
        <Route exact path="/my/entries/view/:id">
          <EntryPage />
        </Route>
        <Route exact path="/my/members">
          <MembersPage />
        </Route>
        <Route exact path="/my/entries/add">
          <AddEntryPage />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="top">
        <IonTabButton tab="home" href="/my/entries">
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
});

export default connect(mapStateToProps, null)(AppTab);
