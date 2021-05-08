import {
  IonApp,
  IonContent,
  IonHeader,
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
import React, { useState } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage";
import EntryPage from "./pages/EntryPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/entries" component={HomePage}>
              {loggedIn ? <HomePage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/settings" component={SettingsPage} />
            <Route path="/entries/:id" component={EntryPage} />
            <Route path="/login">
              <LoginPage
                loggedIn={loggedIn}
                onLogin={() => setLoggedIn(true)}
              />
            </Route>
            <Redirect exact path="/" to="/home" />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/entries">
              <IonIcon icon={homeIcon} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={settingsIcon} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
            <IonTabButton tab="login" href="/login">
              <IonIcon icon={loginIcon} />
              <IonLabel>Login</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
