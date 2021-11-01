import { IonApp, IonLoading } from "@ionic/react";
import React, { } from "react";
import { Provider } from "react-redux";
import store from './store';
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import LoginPage from "./pages/LoginPage";
import AppTabs from "./AppTabs";
import { AuthContext, useAuthInit } from "./Auth";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import TeamSelectionPage from "./pages/TeamSelectionPage";

const App: React.FC = (props: any) => {
  // const { loading, auth } = useAuthInit();
  //const { data } = useAuthInit2(auth);
  const { loggedIn, user } = props.currentUser;
  //  logInStarted(auth)

  return (
    <IonApp>
      <IonReactRouter >
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/teams">
            <TeamSelectionPage />
          </Route>
          <Route path="/my/">
            <AppTabs />
          </Route>
          {loggedIn ?
            <Redirect exact path="/" to="/teams" />
            :
            <Redirect to="/login" />
          }
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth,
});

// const mapDispatchToProps = dispatch => ({
//   logInStarted: user => dispatch(logInStarted(user))
// });

export default connect(mapStateToProps, null)(App);
