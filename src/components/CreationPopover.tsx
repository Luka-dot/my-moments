import React, { useState } from 'react';
import { IonPopover, IonButton, IonList, IonListHeader, IonItem, IonText } from '@ionic/react';

export const CreationPopover: React.FC = () => {
    const [popoverState, setShowPopover] = useState({
        showPopover: false,
        event: undefined,
    });

    return (
        <>
            <IonPopover
                event={popoverState.event}
                isOpen={popoverState.showPopover}
                onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
            >
                <IonList>
                    <IonItem button
                        onClick={() => console.log('button Club')}
                    >Creat a new Cub</IonItem>
                    <IonItem button
                        onClick={() => console.log('buttonTeam')}
                    >Add Team to a Club</IonItem>

                </IonList>
            </IonPopover>
            <IonText
                color="tertiary"
                onClick={(e: any) => {
                    e.persist();
                    setShowPopover({ showPopover: true, event: e });
                }}
            >
                Click to Add Team/Club
            </IonText>
        </>
    );
};