import { IonContent, IonList, IonPage, IonText, IonItem } from "@ionic/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTeamMembers } from '../actions/TeamActions'

const MembersPage: React.FC = (props: any) => {

  useEffect(() => {
    props.getTeamMembers(props.selectedTeam)
  }, [])

  if (!props.members) {
    return (
      <div> ... Loading </div>
    )
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">Where are all the members?
        <IonList>
          {
            props.members.map((member) => (
              <IonItem key={member.id}>
                <IonText>{member.name}</IonText>
              </IonItem>
            ))
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth,
  selectedTeam: state.team.team,
  members: state.team.members
});

export default connect(mapStateToProps, { getTeamMembers })(MembersPage);
