import { IonContent, IonList, IonPage, IonText, IonItem } from "@ionic/react";
import React from "react";

const MembersPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">Where are all the members?
        <IonList>
          <IonItem>
            <IonText>Member one )</IonText>
          </IonItem>
          <IonItem>
            <IonText>Member two )</IonText>
          </IonItem>
          <IonItem>
            <IonText>Member three )</IonText>
          </IonItem>
          <IonItem>
            <IonText>Member four )</IonText>
          </IonItem>
          <IonItem>
            <IonText>Member five )</IonText>
          </IonItem>
          <IonItem>
            <IonText>Member six )</IonText>
          </IonItem>
          <IonItem>
            <IonText>Member seven )</IonText>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MembersPage;
