import { IonCard, IonItem, IonList, IonText } from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux';

function TeamCard(props: any) {
    let teamsList = props.filteredList

    if (teamsList == null) {
        return (
            <IonItem> {console.log(teamsList)}
                <IonText> ... Loading ...</IonText>
            </IonItem>
        )
    }
    return (
        <IonList>
            {console.log(teamsList)}
            {teamsList.map((team) =>
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