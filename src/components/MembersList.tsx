import { IonAvatar, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonRow, IonText } from '@ionic/react'
import React from 'react'
import { connect } from "react-redux";

const MembersList: React.FC = (props: any) => {
    return (
        props.members.map((member) => (
            <IonItem key={member.id} lines="none">
                <IonItemSliding>
                    <IonItemOptions side="start" onClick={() => { }}>
                        <IonItemOption color="danger" expandable>
                            Remove from {props.teamName.name}
                        </IonItemOption>
                    </IonItemOptions>
                    <IonRow>
                        <IonItem className='chatItem'  >
                            <IonAvatar className='avatar' slot='start'>
                                <img className='avatarImg' src="/avatar-grey.png" />
                            </IonAvatar>
                            <IonLabel>
                                <IonText><p className='ion-text-wrap'>{member.name}</p></IonText>
                            </IonLabel>
                        </IonItem>
                    </IonRow>
                </IonItemSliding>
            </IonItem>
        )))
}

const mapStateToProps = (state) => ({
    currentUser: state.auth,
    selectedTeam: state.team.team,
    teamName: state.team.teamName,
    members: state.team.members,
    allMembers: state.team.allMembers
});

export default connect(mapStateToProps, {})(MembersList);