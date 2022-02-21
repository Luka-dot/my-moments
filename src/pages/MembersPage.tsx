import { IonContent, IonList, IonPage, IonText, IonRow, IonCol } from "@ionic/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTeamMembers, getAllMembers } from '../actions/TeamActions'
import AllMembersList from "../components/AllMembersList";
import MembersList from "../components/MembersList";

const MembersPage: React.FC = (props: any) => {

  // *********** New check for admin  **************************
  function isUserAdminCheck2() {
    const admins = props.teamName.organization.admin
    const userIs = props.currentUser.userId
    if (admins === userIs) {
      return true
    }
  }

  useEffect(() => {
    props.getTeamMembers(props.selectedTeam)
    props.getAllMembers()
  }, [])

  if (!props.allMembers) {
    console.log('we dont have it yet!')
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
        {isUserAdminCheck2() ?
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
