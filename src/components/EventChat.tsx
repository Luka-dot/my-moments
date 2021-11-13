import { IonGrid, IonRow, IonText, IonCol, IonAvatar, IonChip, IonItem, IonLabel } from '@ionic/react'
import React from 'react'
import { connect } from 'react-redux'
import { IonContent } from '@ionic/react';

export const EventChat = (props) => {
    return (

        <IonGrid>
            <IonRow>
                <IonCol size='12'>
                    <IonText>This is a CHAT don't you see?</IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size='12'>
                    <IonText>Hey everyone!!!</IonText>
                </IonCol >
                <IonCol size='12'>
                    <IonChip>
                        <IonAvatar> <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" /></IonAvatar> <IonText>Hey everyone!!!</IonText>
                    </IonChip>
                </IonCol>
                <IonCol size='12'>
                    <IonItem>
                        <IonAvatar slot='start'>
                            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                        </IonAvatar>
                        <IonLabel>
                            <IonRow>
                                <h3>Rugby guy </h3> <h5> 2:25 pm</h5>
                            </IonRow>
                            <IonText>Hey everyone!!!</IonText>
                        </IonLabel>

                    </IonItem>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(EventChat)
