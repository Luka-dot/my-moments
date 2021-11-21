import React, { useState } from 'react';
import { IonModal, IonButton, IonCard, IonRow, IonCol, IonGrid, IonContent, IonList, IonItem, IonInput, IonLabel } from '@ionic/react';

interface modalProps {
    modalText: string,
    displayModal: boolean,
    onCancel: any,
    onConfirm: any,
}

export const AddTeamModal = ({ modalText, displayModal, onCancel, onConfirm }: modalProps) => {
    const [name, setName] = useState('')

    return (
        <IonModal
            isOpen={displayModal}
        >
            <IonCard>
                <h4>{modalText}</h4>
                <IonGrid>

                    <IonList>
                        <IonItem>
                            <IonLabel position="stacked">Team Name</IonLabel>
                            <IonInput
                                value={name}
                                onIonChange={(event) => setName(event.detail.value)}
                            />
                        </IonItem>
                    </IonList>

                    <IonRow>
                        <IonCol>
                            <IonButton fill="outline" color="danger" onClick={() => onConfirm(name)} >CREATE</IonButton>
                        </IonCol>
                        <IonCol></IonCol>
                        <IonCol>
                            <IonButton fill="outline" onClick={onCancel}>CANCEL</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCard>
        </IonModal>
    );
};