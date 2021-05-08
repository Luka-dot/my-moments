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
  logInOutline as loginIcon,
} from "ionicons/icons";
import React from "react";

import { Route, Redirect } from "react-router-dom";

import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage";
import EntryPage from "./pages/EntryPage";

interface Props {
  loggedIn: boolean;
}

const AppTab: React.FC<Props> = ({ loggedIn }) => {
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/my/entries">
          <HomePage />
        </Route>
        <Route exact path="/my/settings" component={SettingsPage} />
        <Route exact path="/my/entries/:id">
          <EntryPage />
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
        <IonTabButton tab="login" href="/login">
          <IonIcon icon={loginIcon} />
          <IonLabel>Login</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTab;
