import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { formatDate, formatTime } from "../utils/helpers";
import { trash as trashIcon, create as createIcon } from "ionicons/icons";
import { Modal } from '../shared/Modal';
import { connect } from "react-redux";
import { getSingleEvent } from "../actions/EventsAction";
import { resetSingleEntry } from '../actions/EventsAction';
import { addAttendanceResponse, getAttendance } from '../actions/TeamActions'

import './entryPage.css'

interface RouterParams {
  id: string;
}

const EntryPage: React.FC = (props: any) => {
  const history = useHistory();
  const { id } = useParams<RouterParams>();
  const [entry, setEntry] = useState();
  const [deleteing, setDeleting] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false)
  const [attending, setAttending] = useState(null);
  //  const [editStart, setEditStart] = useState(false)

  function isUserAdminCheck() {
    const checkingMember = props.teamMembers.filter(member => member.id === props.currentUser.userId)

    if (checkingMember[0].isAdmin === true) {
      return true
    }
  }

  // useIonViewWillEnter(() => {
  //   const singleEntry = props.getSingleEvent(props.teamId, id)
  //   console.log('USEEFFECT for SINGLE entry ', singleEntry)
  //   setEntry(singleEntry);
  //   setUserIsAdmin(isUserAdminCheck())
  //   props.getAttendance(props.teamId, id)
  // }, []);

  // useEffect(() => {
  //   console.log(props.singleEntry)
  //   // const data = props.singleEntry.filter(member => member.id === props.currentUserId ? member : null);
  //   // console.log(data)
  //   // setAttending(data);
  // }, [props.singleEntry])

  useEffect(() => {
    const singleEntry = props.getSingleEvent(props.teamId, id)
    console.log('USEEFFECT for SINGLE entry effect ', singleEntry)
    setEntry(singleEntry);
    setUserIsAdmin(isUserAdminCheck())
    props.getAttendance(props.teamId, id)
  }, [])

  // useEffect(() => {
  //   console.log('selected ', attending)
  //   // will fire redux action to add to list of members attending

  //   //  userAttendanceResponse()

  // }, [attending])

  const handleAttendingResponse = (responseValue) => {
    console.log('ATTedning response handler ', responseValue)
    setAttending(responseValue)
    props.addAttendanceResponse(props.teamId, props.currentUserId, id, responseValue);
  }

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

  // const userAttendanceResponse = () => {
  //   console.log(props.singleEntry, props.currentUserId)
  //   let entryData = props.singleEntry
  //   console.log(entryData)
  //   const result = entryData.map(member => member.id === props.currentUserId);  //setAttending(member.status) : null
  //   console.log(result)
  // }

  // const handleEditing = () => {
  //   setEditStart(true)
  //   console.log('Editing')

  // }

  const gettingSingle = () => {
    console.log('getting siglesssss ', props.teamId, id)
    props.getSingleEvent(props.teamId, id)
  }

  if (!props.singleEntry) {
    return (
      <div>Loading....</div>
    )
  }

  console.log(props.attendanceRecord)
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
                <IonButton onClick={() => { }} routerLink={`/my/teams/team/${props.teamId}/entries/${id}/edit`}>
                  <IonIcon icon={createIcon} slot="icon-only" />
                </IonButton>
                <IonButton onClick={() => setDeleting(true)}>
                  <IonIcon icon={trashIcon} slot="icon-only" color='danger' />
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
          modalText={"Are you sure you want to delete this entry?"}
          displayModal={deleteing}
          onCancel={cancelDeleting}
          onConfirm={handleDelete}
        />
        {/* <EditModal
          modalText={'Editing this entry!'}
          displayModal={editStart}
          eventDetails={props.singleEntry}
          onConfirm={handleEditing}
          onCancel={CancelEditing}
          teamId={props.teamId}
          eventId={id}
        /> */}
        <IonGrid>

          <IonCol className="titleColumn" >
            <h4 className="titleText">{props.singleEntry.title}</h4>
          </IonCol>
          <IonRow>
            <IonCol>
              <p>{props.singleEntry.description}</p>
            </IonCol>
          </IonRow>
          <br />
          <IonRow>
            <IonCol size='6'>
              <IonText>Start at: {formatTime(props.singleEntry.startTime)}</IonText>
            </IonCol>
            <IonCol size='6'>
              <IonText>Ending at: {formatTime(props.singleEntry.endTime)}</IonText>
            </IonCol>
          </IonRow>
          {!props.singleEntry.attendanceRequired ?
            <div></div>
            :
            props.singleEntry.attendanceRequired === true ?
              <IonRow className="attendanceRow">
                <IonCol size="4">
                  <p>Attending? </p>
                </IonCol>
                {
                  !props.attendanceRecord[0] ?
                    <IonCol size="8">
                      <IonSegment
                        //      onIonChange={(event) => handleAttendingResponse(event.detail.value)} color="tertiary"
                        onIonChange={() => console.log('pressed null')} color="tertiary"
                        value={attending} >
                        <IonSegmentButton value="yes" >
                          <IonLabel>Yes</IonLabel>
                        </IonSegmentButton  >
                        <IonSegmentButton value='no' >
                          <IonLabel>No</IonLabel>
                        </IonSegmentButton >
                        <IonSegmentButton value='maybe' >
                          <IonLabel>Maybe</IonLabel>
                        </IonSegmentButton >
                      </IonSegment>
                    </IonCol>
                    :
                    <IonCol size="8">
                      <IonSegment
                        onIonChange={(event) => handleAttendingResponse(event.detail.value)} color="tertiary"
                        //  onIonChange={() => console.log('pressed')} color="tertiary"
                        value={props?.attendanceRecord[0]?.status} >
                        <IonSegmentButton value="yes" >
                          <IonLabel>Yes</IonLabel>
                        </IonSegmentButton  >
                        <IonSegmentButton value='no' >
                          <IonLabel>No</IonLabel>
                        </IonSegmentButton >
                        <IonSegmentButton value='maybe' >
                          <IonLabel>Maybe</IonLabel>
                        </IonSegmentButton >
                      </IonSegment>
                    </IonCol>
                }

              </IonRow>
              :
              <div></div>
          }
          {props.singleEntry.isMatch === true ?
            <IonRow>
              <IonCol>
                <IonText>Final Score:</IonText>
              </IonCol>
              <IonCol>
                {props.singleEntry.result}
              </IonCol>
            </IonRow>
            :
            <div></div>
          }
          {props.singleEntry.location ?
            <IonText>Location:  {props.singleEntry.location}</IonText>
            :
            <div></div>
          }
        </IonGrid>
      </IonContent>
      <IonButton
        onClick={gettingSingle}
      >Get Event details</IonButton>
    </IonPage >
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth,
  currentUserId: state.auth.user.uid,
  teamEvents: state.team.events,
  teamMembers: state.team.members,
  teamId: state.team.team,
  singleEntry: state.team.singleEvent,
  attendanceRecord: state.team.eventAttendance,
});

export default connect(mapStateToProps, { getSingleEvent, resetSingleEntry, addAttendanceResponse, getAttendance })(EntryPage);