import { IonAvatar, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonRow, IonText } from '@ionic/react'
import React from 'react'
import { connect } from "react-redux";

const AllMembersList: React.FC = (props: any) => {
    return (
        props.allMembers.map((member) => (
            <IonItem key={member.id} lines="none">
                <IonItemSliding>
                    <IonItemOptions side="start" onClick={() => { }}>
                        <IonItemOption color="danger" expandable>
                            Delete
                        </IonItemOption>
                    </IonItemOptions>
                    <IonRow>
                        <IonItem className='chatItem'  >
                            <IonAvatar className='avatar' slot='start'>
                                <img className='avatarImg' src="/avatar-grey.png" />
                            </IonAvatar>
                            <IonLabel>
                                <IonText><p className='ion-text-wrap'>{member.userName}</p></IonText>
                            </IonLabel>
                        </IonItem>
                    </IonRow>
                    <IonItemOptions side="end" onClick={() => { }}>
                        <IonItemOption color="tertiary" expandable>
                            Add to {props.teamName.name}
                        </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
            </IonItem>
        ))
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.auth,
    selectedTeam: state.team.team,
    teamName: state.team.teamName,
    members: state.team.members,
    allMembers: state.team.allMembers
});

export default connect(mapStateToProps, {})(AllMembersList);