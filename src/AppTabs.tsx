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
  construct,
} from "ionicons/icons";
import React from "react";

import { Route, Redirect } from "react-router-dom";

import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage";
import EntryPage from "./pages/EntryPage";
import AccountPage from "./pages/AccountPage";
import { useAuth } from "./Auth";
import AddEntryPage from "./pages/AddEntryPage";

const AppTab: React.FC = () => {
  const { loggedIn, userName } = useAuth();
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  console.log(loggedIn, userName)
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
        <Route exact path="/my/entries/add">
          <AddEntryPage />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/my/entries">
          <IonIcon icon={homeIcon} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
          <IonIcon icon={settingsIcon} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
        <IonTabButton tab="login" href="/my/account">
          <IonIcon icon={construct} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTab;
