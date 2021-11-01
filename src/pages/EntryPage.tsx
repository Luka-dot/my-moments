import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewDidEnter
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { formatDate, formatTime } from "../utils/helpers";
import { trash as trashIcon } from "ionicons/icons";
import { Modal } from '../shared/Modal';
import { connect } from "react-redux";
import { EditModal } from './../shared/EditModel';
import { getSingleEvent } from "../actions/EventsAction";
import { resetSingleEntry } from '../actions/EventsAction';

interface RouterParams {
  id: string;
}

const EntryPage: React.FC = (props: any) => {
  const history = useHistory();
  const { id } = useParams<RouterParams>();
  const [entry, setEntry] = useState();
  const [deleteing, setDeleting] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false)
  const [editStart, setEditStart] = useState(false)

  function isUserAdminCheck() {
    console.log(props.teamMembers)
    const checkingMember = props.teamMembers.filter(member => member.id === props.currentUser.userId)
    console.log(checkingMember)
    if (checkingMember[0].isAdmin === true) {
      return true
    }
  }

  useIonViewWillEnter(() => {
    const singleEntry = props.getSingleEvent(props.teamId, id)
    console.log('USEEFFECT for SINGLE entry ', singleEntry)
    setEntry(singleEntry);
    setUserIsAdmin(isUserAdminCheck())
  }, []);

  useEffect(() => {
    const singleEntry = props.getSingleEvent(props.teamId, id)
    console.log('USEEFFECT for SINGLE entry effect ', singleEntry)
    setEntry(singleEntry);
  }, [])

  // useIonViewDidEnter(() => {
  //   const singleEntry = props.getSingleEvent(props.teamId, id)
  //   console.log('USEEFFECT for SINGLE entry IONIC ', singleEntry)
  //   setEntry(singleEntry);
  // }, [])

  // useEffect(() => {
  //   console.log("RESTTINNGGGGGGG JHGFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFJK")
  //   props.resetSingleEntry()
  // }, [])

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
    console.log('Cancel EDIT - need FETCH Event HERE');

    setEditStart(false)
  }

  const gettingSingle = () => {
    console.log('getting siglesssss ', props.teamId, id)
    props.getSingleEvent(props.teamId, id)
  }

  if (!props.singleEntry) {
    return (
      <div>Loading....</div>
    )
  }
  console.log(entry)
  console.log(props.singleEntry)

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

          <IonTitle>Entry for {formatDate(props.singleEntry.date)}</IonTitle>
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
          eventDetails={props.singleEntry}
          onConfirm={handleEditing}
          onCancel={CancelEditing}
          teamId={props.teamId}
          eventId={id}
        />
        <h4>{props.singleEntry.title}</h4>
        <p>{props.singleEntry.description}</p>
        <br />
        <IonText>Start at: {formatTime(props.singleEntry.startTime)}</IonText>
        <br />
        <IonText>Ending at: {formatTime(props.singleEntry.endTime)}</IonText>
        {!props.singleEntry.attendanceRequired ?
          <div></div>
          :
          props.singleEntry.attendanceRequired === true ?
            <p>We will need Attendance</p>
            :
            <div></div>
        }
        {props.singleEntry.isMatch === true ?
          <IonText>Final Score: {props.singleEntry.result}</IonText>
          :
          <div></div>
        }
      </IonContent>
      {
        userIsAdmin ?
          <IonItem
            routerLink={`/my/entries/view/edit/${id}`}
          >
            <IonButton
              onClick={() => { }}
            >EDIT</IonButton>
          </IonItem>
          :
          <div>Messages</div>
      }
      <IonButton
        onClick={gettingSingle}
      >Get Event details</IonButton>
    </IonPage>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth,
  currentUserId: state.auth.user.uid,
  teamEvents: state.team.events,
  teamMembers: state.team.members,
  teamId: state.team.team,
  singleEntry: state.team.singleEvent,
});

export default connect(mapStateToProps, { getSingleEvent, resetSingleEntry })(EntryPage);



// if (!entry) {
//   return (
//     <div>Loading....</div>
//   )
// }

// return (
//   <IonPage>
//     <IonHeader>
//       <IonToolbar>
//         <IonButtons slot="start">
//           <IonBackButton />
//         </IonButtons>
//         {
//           userIsAdmin ?
//             <IonButtons slot="end">
//               <IonButton onClick={() => setDeleting(true)}>
//                 <IonIcon icon={trashIcon} slot="icon-only" />
//               </IonButton>
//             </IonButtons>
//             :
//             <div></div>
//         }

//         <IonTitle>Entry for {formatDate(entry.date)}</IonTitle>
//       </IonToolbar>
//     </IonHeader>
//     <IonContent className="ion-padding">
//       <Modal
//         modalText={"Are you sure you want to delete this memory?"}
//         displayModal={deleteing}
//         onCancel={cancelDeleting}
//         onConfirm={handleDelete}
//       />
//       <EditModal
//         modalText={'Editing this entry!'}
//         displayModal={editStart}
//         eventDetails={entry}
//         onConfirm={handleEditing}
//         onCancel={CancelEditing}
//         teamId={props.teamId}
//       />
//       <h4>{entry.title}</h4>
//       <p>{entry.description}</p>
//       <br />
//       <IonText>Start at: {formatTime(entry.startTime)}</IonText>
//       <br />
//       <IonText>Ending at: {formatTime(entry.endTime)}</IonText>
//       {!entry.attendanceRequired ?
//         <div></div>
//         :
//         entry.attendanceRequired === true ?
//           <p>We will need Attendance</p>
//           :
//           <div></div>
//       }
//       {entry.isMatch === true ?
//         <IonText>Final Score: {entry.result}</IonText>
//         :
//         <div></div>
//       }
//     </IonContent>
//     {
//       userIsAdmin ?
//         <IonButton
//           onClick={handleEditing}
//         >EDIT</IonButton>
//         :
//         <div>Messages</div>
//     }
//     <IonButton
//       onClick={gettingSingle}
//     >Get Event details</IonButton>
//   </IonPage>