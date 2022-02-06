import React, { useState } from 'react';
import { IonPopover, IonButton, IonList, IonListHeader, IonItem } from '@ionic/react';

export const PopoverExample: React.FC = () => {
    const [popoverState, setShowPopover] = useState({
        showPopover: false,
        event: undefined,
    });
    console.log(popoverState)
    return (
        <>
            <IonPopover
                event={popoverState.event}
                isOpen={popoverState.showPopover}
                onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
            >
                <IonList>
                    <IonListHeader>BLAAAA</IonListHeader>
                    <IonItem button
                        onClick={() => console.log('buttonTeam')}
                    >Create a new Team</IonItem>
                    <IonItem button>Creat a new Cub</IonItem>
                </IonList>
            </IonPopover>
            <IonButton
                color="tertiary"
                onClick={(e: any) => {
                    e.persist();
                    setShowPopover({ showPopover: true, event: e });
                }}
            >
                Add Team/Club
            </IonButton>
        </>
    );
};