import { IonContent, IonList, IonPage, IonText, IonItem, IonRow, IonCol, IonItemSliding, IonAvatar, IonLabel, IonItemOptions, IonItemOption } from "@ionic/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTeamMembers, getAllMembers } from '../actions/TeamActions'
import AllMembersList from "../components/AllMembersList";
import MembersList from "../components/MembersList";

const MembersPage: React.FC = (props: any) => {

  useEffect(() => {
    props.getTeamMembers(props.selectedTeam)
    props.getAllMembers()
  }, [])

  if (!props.allMembers) {
    return (
      <div> ... Loading </div>
    )
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonRow>
          <IonCol>
            <IonText color='tertiary'>{props.teamName.name}</IonText><IonText> team members</IonText>
            <IonList>
              <MembersList />
            </IonList>
          </IonCol>
        </IonRow>
        {props.currentUser.curentUserDetails.isAdmin ?
          <IonRow>
            <IonCol size='12'>
              <IonText>All Clayton Rugby members list</IonText>
              <IonList>
                <AllMembersList />
              </IonList>
            </IonCol>
          </IonRow>
          :
          <div></div>
        }
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth,
  selectedTeam: state.team.team,
  teamName: state.team.teamName,
  members: state.team.members,
  allMembers: state.team.allMembers
});

export default connect(mapStateToProps, { getTeamMembers, getAllMembers })(MembersPage);
