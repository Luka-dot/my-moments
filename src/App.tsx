import {
  IonApp,
  IonContent,
  IonHeader,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>     
        <IonRouterOutlet >
          <Route exact path='/home' component={HomePage}/>
          <Route path='/settings' component={SettingsPage}/>
          <Redirect exact path='/' to='/home' />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

