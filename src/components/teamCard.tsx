import { IonCard, IonItem, IonList, IonText } from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux';

function TeamCard(props: any) {
    let teamsList = props.filteredList

    if (teamsList == null) {
        return (
            <IonItem>
                <IonText> ... Loading ...</IonText>
            </IonItem>
        )
    }
    return (
        <IonList>
            {teamsList.length === 0 ?
                <IonCard>
                    <IonText>You are not a membember of any team.</IonText>
                    <IonText>Maybe create one?</IonText>
                </IonCard>
                : teamsList.map((team) =>
                    <IonCard key={team.id}>
                        <IonItem
                            lines="none"
                            button
                            onClick={() => props.handleSelectTeam(team.id)}
                            routerLink={`/my/teams/team/${team.id}`}
                        >
                            <p>{team.name}</p>
                        </IonItem>
                    </IonCard>
                )}

        </IonList>
    )
}

const mapStateToProps = (state) => {

    return ({
        filteredList: state.team.userAvaileTeams,
    })
}

export default connect(mapStateToProps, {})(TeamCard);