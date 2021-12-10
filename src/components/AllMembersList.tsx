import { IonAvatar, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonRow, IonText } from '@ionic/react'
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { addMemberToTeam } from '../actions/TeamActions';
import { addMemberToSpecificTeamColection } from '../firebase'

import './membersListShared.css';

const AllMembersList: React.FC = (props: any) => {

    const [availableMembers, setAvailableMembers] = useState<any>([])

    useEffect(() => {
        setAvailableMembers(props.allMembers.filter(member => {
            return !member.memberOfTeam.includes(props.selectedTeam)
        }))
        console.log(availableMembers, props.selectedTeam)
    }, [props.allMembers])

    function handleAddMember(memberId, member) {
        props.addMemberToTeam(props.selectedTeam, memberId)
        addMemberToSpecificTeamColection(props.selectedTeam, member)
    }

    function handleDeleteMember(memberId) {
        console.log('DELETEING member to a team ', memberId)
    }

    return (
        availableMembers.map((member) => (
            <IonItem key={member.id} lines="none">
                <IonItemSliding>
                    <IonItemOptions side="start" onClick={() => handleDeleteMember(member.id)}>
                        <IonItemOption color="danger" expandable>
                            Delete
                        </IonItemOption>
                    </IonItemOptions>
                    <IonRow>
                        <IonItem className='chatItem'  >
                            <IonAvatar className='avatar' slot='start'>
                                <img className='avatarImg' src={member.pictureUrl ? member.pictureUrl : "/avatar-grey.png"} />
                            </IonAvatar>
                            <IonLabel>
                                <IonText><p className='ion-text-wrap'>{member.userName}</p></IonText>
                                <IonText><p className='email-text'>{member.email}</p></IonText>
                            </IonLabel>
                        </IonItem>
                    </IonRow>
                    <IonItemOptions side="end" onClick={() => { }}>
                        <IonItemOption color="tertiary" expandable onClick={() => handleAddMember(member.id, member)}>
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

export default connect(mapStateToProps, { addMemberToTeam })(AllMembersList);