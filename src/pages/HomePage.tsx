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
import { add as addIcon, contractOutline } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useAuth } from "../Auth";
import EntriesItem from '../components/EntriesItem';

import { firestore } from "../firebase";
import { Entry, toEntry } from "../Models";
import { getMemoriesForUser } from '../actions/MemoriesAction';

const HomePage: React.FC = (props: any) => {
  //  const [entries, setEntries] = useState<Entry[]>([]);

  const { user } = props.currentUser

  console.log('home page render ')

  useEffect(() => {
    props.getMemoriesForUser(props.currentUserId)

    // const entriesRef = firestore
    //   .collection("users")
    //   .doc(props.currentUserId)
    //   .collection("entries");
    // console.log('home page useEffect ', entries, entriesRef)
    // return entriesRef
    //   .orderBy("date", "desc")
    //   .onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  }, [props.currentUserId]);

  //  firestore.collection('users').doc(props.currentUserId).collection("entries").get().then(snaphot => { console.log(snaphot) });
  console.log(props.memories)
  console.dir(props.memories)

  if (!props.memories) {
    return (
      <div>Loading....</div>
    )
  }
  console.log(props.memories[0])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily Moments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
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
