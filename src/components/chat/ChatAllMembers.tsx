import { IonAvatar, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonRow, IonText } from '@ionic/react'
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const ChatAllMembers: React.FC = (props: any) => {
    const [availableMembers, setAvailableMembers] = useState<any>()

    useEffect(() => {
        console.log('ALLL MEMBERS ', props.allMembers)
        setAvailableMembers(props.allMembers.filter(member => {
            return !member.memberOfTeam.includes(props.selectedTeam)
        }))
        console.log(availableMembers, props.selectedTeam)
    }, [props.allMembers, props.selectedTeam])

    if (!availableMembers) {
        return (<div>... <p>Loading</p> ... </div>)
    }

    return (
        availableMembers.map((member) => (
            <IonItem key={member.id} lines="none">
                {console.log(props.allMembers)}
                <IonRow>
                    <IonItem className='chatItem' lines="none" >
                        <IonAvatar className='avatar' slot='start'>
                            <img className='avatarImg' src={member.pictureUrl ? member.pictureUrl : "/avatar-grey.png"} />
                        </IonAvatar>
                        <IonLabel>
                            <IonText><p className='ion-text-wrap'>{member.userName}</p></IonText>
                            <IonText><p className='email-text'>{member.email}</p></IonText>
                        </IonLabel>
                    </IonItem>
                </IonRow>
            </IonItem>
        ))
    );
};


const mapStateToProps = (state) => ({
    currentUser: state.auth,
    selectedTeam: state.team.team,
    teamName: state.team.teamName,
    members: state.team.members,
    allMembers: state.team.allMembers
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatAllMembers);
