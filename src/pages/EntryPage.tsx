import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { firestore } from "../firebase";
import { Entry, toEntry } from "../Models";
import { formatDate, formatTime } from "../utils/helpers";
import { trash as trashIcon } from "ionicons/icons";
import { Modal } from '../shared/Modal';
import { connect } from "react-redux";
import { eventNames } from "process";
import { EditModal } from './../shared/EditModel';

interface RouterParams {
  id: string;
}

const EntryPage: React.FC = (props: any) => {
  const history = useHistory();
  const { id } = useParams<RouterParams>();
  const [entry, setEntry] = useState<any>();
  const [deleteing, setDeleting] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false)
  const [editStart, setEditStart] = useState(false)

  console.log('event : ', entry)

  function isUserAdminCheck() {
    console.log(props.teamMembers)
    const checkingMember = props.teamMembers.filter(member => member.id === props.currentUser.userId)
    console.log(checkingMember)
    if (checkingMember[0].isAdmin === true) {
      return true
    }
  }

  useEffect(() => {
    const singleEntry = props.teamEvents.filter((event) => event.id === id)
    setEntry(singleEntry[0]);
    setUserIsAdmin(isUserAdminCheck())
  }, []);

  const handleDelete = async () => {
    console.log('handle delete')
    setDeleting(true)
    // const entryRef = firestore
    //   .collection("users")
    //   .doc(props.currentUserId)
    //   .collection("entries")
    //   .doc(id);
    // await entryRef.delete();
    setDeleting(false);
    // console.log('delete ends')
    history.goBack();
  };

  const cancelDeleting = () => {
    console.log('DELETING CANCEL')
    setDeleting(false);
  }

  const handleEditing = () => {
    setEditStart(true)
    console.log('Editing')

  }

  const CancelEditing = () => {
    console.log('Cancel EDIT');
    setEditStart(false)
  }

  if (!entry) {
    return (
      <div>Loading....</div>
    )
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          {
            userIsAdmin ?
              <IonButtons slot="end">
                <IonButton onClick={() => setDeleting(true)}>
                  <IonIcon icon={trashIcon} slot="icon-only" />
                </IonButton>
              </IonButtons>
              :
              <div></div>
          }

          <IonTitle>Entry for {formatDate(entry.date)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Modal
          modalText={"Are you sure you want to delete this memory?"}
          displayModal={deleteing}
          onCancel={cancelDeleting}
          onConfirm={handleDelete}
        />
        <EditModal
          modalText={'Editing this entry!'}
          displayModal={editStart}
          eventDetails={entry}
          onConfirm={handleEditing}
          onCancel={CancelEditing}
        />
        <h4>{entry.title}</h4>
        <p>{entry.description}</p>
        <br />
        <IonText>Start at: {formatTime(entry.startTime)}</IonText>
        <br />
        <IonText>Ending at: {formatTime(entry.endTime)}</IonText>
        {!entry.attendanceRequired ?
          <div></div>
          :
          entry.attendanceRequired === true ?
            <p>We will need Attendance</p>
            :
            <div></div>
        }
        {entry.isMatch === true ?
          <IonText>Final Score: {entry.result}</IonText>
          :
          <div></div>
        }
      </IonContent>
      {
        userIsAdmin ?
          <IonButton
            onClick={handleEditing}
          >EDIT</IonButton>
          :
          <div>Messages</div>
      }
    </IonPage>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth,
  currentUserId: state.auth.user.uid,
  memories: state.memories.memories,
  teamEvents: state.team.events,
  teamMembers: state.team.members,
});

export default connect(mapStateToProps)(EntryPage);
