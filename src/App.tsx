import { IonApp, IonHeader, IonPage } from "@ionic/react";
import React, { } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import OneSignal from 'onesignal-cordova-plugin';

import LoginPage from "./pages/LoginPage";
import AppTabs from "./AppTabs";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import TeamSelectionPage from "./pages/TeamSelectionPage";

// Call this function when your app starts
function OneSignalInit(): void {
  // Uncomment to set OneSignal device logging to VERBOSE  
  // OneSignal.setLogLevel(6, 0);

  // NOTE: Update the setAppId value below with your OneSignal AppId.
  OneSignal.setAppId("fb954bfe-7d60-443d-a7dd-695ffd616880");
  OneSignal.setNotificationOpenedHandler(function (jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });

  // iOS - Prompts the user for notification permissions.
  //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
  OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
    console.log("User accepted notifications: " + accepted);
  });
}

const App: React.FC = (props: any) => {
  OneSignalInit()
  // const { loading, auth } = useAuthInit();
  //const { data } = useAuthInit2(auth);
  const { loggedIn } = props.currentUser;
  //  logInStarted(auth)

  return (
    <IonApp>
      {/* {!props.selectedTeamName ?
        <IonHeader>
          <p></p>
        </IonHeader>
        :
        <IonHeader>
          <p>Current Team is: {props.selectedTeamName}</p>
        </IonHeader>
      } */}

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
          <Route path="/my/teams/:id">
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

export default connect(mapStateToProps, null)(App);
