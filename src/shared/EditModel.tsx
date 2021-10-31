import React from 'react';
import { IonModal, IonButton, IonCard, IonRow, IonCol, IonGrid, IonText } from '@ionic/react';

interface modalProps {
    modalText: string,
    displayModal: boolean,
    onCancel: any,
    onConfirm: any,
    eventDetails: any,
}

export const EditModal = ({ modalText, displayModal, onCancel, onConfirm, eventDetails }: modalProps) => {

    return (
        <IonModal
            isOpen={displayModal}
        >
            <IonCard>
                <h4>{modalText}</h4>
                <IonGrid>
                    <IonRow>
                        <IonText>Edit time</IonText>
                    </IonRow>

                </IonGrid>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonButton fill="outline" color="danger" onClick={onConfirm} >CONFIRM</IonButton>
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