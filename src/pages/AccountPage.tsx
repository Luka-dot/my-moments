import {
  IonNote,
  IonItem,
  IonLabel,
  IonList,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonListHeader,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import React from "react";
import { auth } from "../firebase";

const AccountPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonListHeader>Basic</IonListHeader>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonNote>Default</IonNote>
              </IonCol>
              <IonCol>
                <IonNote color="primary">Primary</IonNote>
              </IonCol>
              <IonCol>
                <IonNote color="secondary">Secondary</IonNote>
              </IonCol>
              <IonCol>
                <IonNote color="tertiary">Tertiary</IonNote>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonNote color="success">Success</IonNote>
              </IonCol>
              <IonCol>
                <IonNote color="warning">warning</IonNote>
              </IonCol>
              <IonCol>
                <IonNote color="danger">Danger</IonNote>
              </IonCol>
              <IonCol>
                <IonNote color="dark">Dark</IonNote>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonListHeader>List Notes</IonListHeader>
          <IonItem>
            <IonLabel>Default</IonLabel>
            <IonNote slot="end">11</IonNote>
          </IonItem>

          <IonItem>
            <IonLabel>Primary</IonLabel>
            <IonNote slot="end" color="primary">
              22
            </IonNote>
          </IonItem>

          <IonItem>
            <IonLabel>Secondary</IonLabel>
            <IonNote slot="end" color="secondary">
              33
            </IonNote>
          </IonItem>

          <IonItem>
            <IonLabel>Tertiary</IonLabel>
            <IonNote slot="end" color="tertiary">
              44
            </IonNote>
          </IonItem>

          <IonItem>
            <IonLabel>Success</IonLabel>
            <IonNote slot="start" color="success">
              55
            </IonNote>
          </IonItem>

          <IonItem>
            <IonLabel>Warning</IonLabel>
            <IonNote slot="start" color="warning">
              66
            </IonNote>
          </IonItem>

          <IonItem>
            <IonLabel>Danger</IonLabel>
            <IonNote slot="start" color="danger">
              77
            </IonNote>
          </IonItem>

          <IonItem>
            <IonLabel>Dark</IonLabel>
            <IonNote slot="start" color="dark">
              88
            </IonNote>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AccountPage;
