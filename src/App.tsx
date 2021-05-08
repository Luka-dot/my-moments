import { IonApp, IonRouterOutlet } from "@ionic/react";

import React, { useState } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AppTabs from "./AppTabs";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login">
            <LoginPage loggedIn={loggedIn} onLogin={() => setLoggedIn(true)} />
          </Route>
          <Route path="/my">
            <AppTabs loggedIn={loggedIn} />
          </Route>

          <Redirect exact path="/" to="/my/entries" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
