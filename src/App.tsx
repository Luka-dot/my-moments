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

const App: React.FC = (props: any) => {
  const { loading, auth } = useAuthInit();
  //const { data } = useAuthInit2(auth);

  if (loading) {
    return <IonLoading isOpen />;
  }

  console.log(auth)
  console.log(props)
  //  logInStarted(auth)

  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <IonReactRouter >
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

// const mapDispatchToProps = dispatch => ({
//   logInStarted: user => dispatch(logInStarted(user))
// });

export default connect(null, null)(App);
