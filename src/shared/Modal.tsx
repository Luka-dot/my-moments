import React from 'react';
import { IonModal, IonButton, IonCard, IonRow, IonCol, IonGrid } from '@ionic/react';

interface modalProps {
    modalText: string,
    displayModal: boolean,
    onCancel: any,
    onConfirm: any,
}

export const Modal = ({ modalText, displayModal, onCancel, onConfirm }: modalProps) => {

    return (
        <IonModal
            isOpen={displayModal}
        >
            <IonCard>
                <h4>{modalText}</h4>
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