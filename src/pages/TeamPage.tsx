import {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonIcon,
} from "@ionic/react";
import { add as addIcon } from "ionicons/icons";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import EntriesItem from '../components/EntriesItem';
import { getMemoriesForUser } from '../actions/MemoriesAction';

const HomePage: React.FC = (props: any) => {

    useEffect(() => {
        props.getMemoriesForUser(props.currentUserId)
    }, [props.currentUserId]);

    //  firestore.collection('users').doc(props.currentUserId).collection("entries").get().then(snaphot => { console.log(snaphot) });
    console.log(props.memories)
    console.dir(props.memories)

    if (!props.memories) {
        return (
            <div>Loading....</div>
        )
    }

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h3>TEAM PAGE</h3>
                <IonList>
                    <EntriesItem />
                </IonList>
                <IonFab vertical="bottom" horizontal="end">
                    <IonFabButton routerLink="/my/entries/add">
                        <IonIcon icon={addIcon} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.auth,
    currentUserId: state.auth.user.uid,
    memories: state.memories.memories
});

export default connect(mapStateToProps, { getMemoriesForUser })(HomePage);