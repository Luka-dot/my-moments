import { IonApp, IonHeader, IonPage } from "@ionic/react";
import React, { } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';



import LoginPage from "./pages/LoginPage";
import AppTabs from "./AppTabs";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import TeamSelectionPage from "./pages/TeamSelectionPage";

import PushNotificationsContainer from './shared/PushNotificationContainer'

const App: React.FC = (props: any) => {
  // const { loading, auth } = useAuthInit();
  //const { data } = useAuthInit2(auth);
  const { loggedIn } = props.currentUser;
  //  logInStarted(auth)

  return (
    <IonApp>

      <PushNotificationsContainer />
    </IonApp>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth,
});

export default connect(mapStateToProps, null)(App);


//  targetSdkVersion project.hasProperty('targetSdkVersion') ? rootProject.ext.targetSdkVersion : 29
{/* {!props.selectedTeamName ?
        <IonHeader>
          <p></p>
        </IonHeader>
        :
        <IonHeader>
          <p>Current Team is: {props.selectedTeamName}</p>
        </IonHeader>
      } */}

      // <IonReactRouter >
      //   <Switch>
      //     <Route path="/login">
      //       <LoginPage />
      //     </Route>
      //     <Route path="/register">
      //       <RegisterPage />
      //     </Route>
      //     <Route path="/teams">
      //       <TeamSelectionPage />
      //     </Route>
      //     <Route path="/my/teams/:id">
      //       <AppTabs />
      //     </Route>
      //     {loggedIn ?
      //       <Redirect exact path="/" to="/teams" />
      //       :
      //       <Redirect to="/login" />
      //     }
      //     <Route>
      //       <NotFoundPage />
      //     </Route>
      //   </Switch>
      // </IonReactRouter>