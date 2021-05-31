import {
    IonItem,
    IonLabel,
    IonThumbnail,
    IonImg,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { formatDate } from '../utils/helpers';
import { Entry } from '../Models';
import { connect } from "react-redux";

interface EntriesProps {
    entries: Entry[]
}

const EntriesItem = (props: any) => {
    const mem = props.memories.memories

    return (
        <div>
            {
                mem.map((entry) => (
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

const mapStateToProps = (state) => ({
    memories: state.memories
});

export default connect(mapStateToProps, null)(EntriesItem);