import { IonApp, IonLoading } from "@ionic/react";

import React, { useState, useEffect } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AppTabs from "./AppTabs";
import { AuthContext } from "./Auth";
import NotFoundPage from "./pages/NotFoundPage";
//import firebase from "firebase/app";
import { auth } from "./firebase";

const App: React.FC = () => {
  const [authState, setAuthState] = useState({
    loading: true,
    loggedIn: false,
  });

  useEffect(() => {
    // firebase.auth().onAuthStateChanged((user) => {
    auth.onAuthStateChanged((user) => {
      setAuthState({ loading: false, loggedIn: Boolean(user) });
    });
  }, []);

  if (authState.loading) {
    return <IonLoading isOpen />;
  }

  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn: authState.loggedIn }}>
        <IonReactRouter>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/my">
              <AppTabs />
            </Route>

            <Redirect exact path="/" to="/my/entries" />
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
