import {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonFab,
    IonFabButton,
    IonIcon,
    IonLabel,
    IonThumbnail,
    IonImg,
} from "@ionic/react";
import { add as addIcon } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { formatDate } from '../utils/helpers';
import { Entry } from '../Models';

interface EntriesProps {
    entries: Entry[]
}

const EntriesItem = (props: EntriesProps) => {

    return (
        <div>
            {
                props.entries.map((entry) => (
                    <IonItem
                        button
                        key={entry.id}
                        routerLink={`/my/entries/view/${entry.id}`}
                    >
                        <IonThumbnail slot="end">
                            <IonImg src={entry.pictureUrl} />
                        </IonThumbnail>
                        <IonLabel>
                            <h3>{entry.title}</h3>
                            <h4>{formatDate(entry.date)}</h4>
                        </IonLabel>
                    </IonItem>
                ))
            }
        </div>
    );
};

export default EntriesItem;