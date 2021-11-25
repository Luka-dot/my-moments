import {
    IonItem,
    IonLabel,
    IonThumbnail,
    IonImg,
} from "@ionic/react";
import { formatDate } from '../utils/helpers';
import { Entry } from '../Models';

interface EntriesProps {
    entries: Entry[]
}

const NavBar = ({ entries }: EntriesProps) => {

    return (
        <div>
            {
                entries.map((entry) => (
                    <IonItem
                        lines="none"
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

export default NavBar;