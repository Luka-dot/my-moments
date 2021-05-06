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
} from '@ionic/react';
import { home as homeIcon, settings as settingsIcon  } from 'ionicons/icons';
import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import SettingsPage from './pages/SettingsPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>    
        <IonTabs> 
          <IonRouterOutlet >
            <Route exact path='/home' component={HomePage}/>
            <Route path='/settings' component={SettingsPage}/>
            <Redirect exact path='/' to='/home' />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab='home' href='/home'>
              <IonIcon icon={homeIcon}/>
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab='settings' href='/settings'>
              <IonIcon icon={settingsIcon} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

