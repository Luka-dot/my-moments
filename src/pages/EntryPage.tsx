import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { formatTime, formatLongDate } from "../utils/helpers";
import { trash as trashIcon, create as createIcon, chevronDown as downArrow, chevronUp as upArrow } from "ionicons/icons";
import { Modal } from '../shared/Modal';
import { connect } from "react-redux";
import { getSingleEvent } from "../actions/EventsAction";
import { resetSingleEntry } from '../actions/EventsAction';
import { addAttendanceResponse, getAttendance } from '../actions/TeamActions'
import { deleteEvent } from '../firebase';

import './entryPage.css'
import AttendingDetails from "../components/AttendingDetails";
import { getAllAttendees } from './../actions/TeamActions';
import MapComponent from "../components/MapComponent";
import EventChat from "../components/EventChat";

interface RouterParams {
  id: string;
}

const EntryPage: React.FC = (props: any) => {
  const history = useHistory();
  const { id } = useParams<RouterParams>();
  const [entry, setEntry] = useState<any>();
  const [deleteing, setDeleting] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false)
  const [attending, setAttending] = useState({ id: '1', status: 'no' });
  const [showAttendees, setShowAttendees] = useState(false)
  const [weatherData, setWeatherData] = useState<any>()

  function isUserAdminCheck() {
    const checkingMember = props.teamMembers.filter(member => member.id === props.currentUser.userId)

    if (checkingMember[0]?.isAdmin === true) {
      return true
    }
  }

  // async function weatherCheck() {
  //   await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${props.singleEntry.coordinance.lat}&lon=${props.singleEntry.coordinance.lng}&units=metric&APPID=${process.env.REACT_APP_WEATER}`)
  //     .then(res => res.json())
  //     .then(result => {
  //       setWeatherData(result)
  //       console.log(result);
  //     });
  // }

  useEffect(() => {
    const singleEntry = props.getSingleEvent(props.teamId, id)

    setEntry(singleEntry);
    setUserIsAdmin(isUserAdminCheck())
    setAttending(props.getAttendance(props.teamId, id, props.currentUser.userId))
    props.getAllAttendees(props.teamId, id)
    setWeatherData(null)
  }, [])

  useEffect(() => {
    // will fire redux action to add to list of members attending
    renderAttendanceButtonYes()
    renderAttendanceButtonNo()
    renderAttendanceButtonMaybe()
  }, [props.attendanceRecord])

  //  ***********  Need to add check for missing UserName in DB ***************
  const handleAttendingResponse = (responseValue) => {
    console.log('ATTedning response handler ', props.currentUser.curentUserDetails.userName)
    setAttending(responseValue)
    props.addAttendanceResponse(props.teamId, props.currentUserId, id, responseValue, props.currentUser.curentUserDetails.userName);
  }

  const handleDelete = async () => {
    console.log('handle delete')
    setDeleting(true)
    deleteEvent(props.teamId, id)
    setDeleting(false);
    history.goBack();
  };

  const cancelDeleting = () => {
    console.log('DELETING CANCEL')
    setDeleting(false);
  }

  const gettingSingle = () => {
    console.log('getting siglesssss ', props.teamId, id)
    props.getSingleEvent(props.teamId, id)
  }

  if (!props.singleEntry) {   //|| !props?.attendanceRecord
    return (
      <div>Loading....</div>
    )
  }

  // if (props.singleEntry.coordinance && !weatherData) {
  //   weatherCheck()
  // }

  function renderAttendanceButtonYes() {
    if (props.attendanceRecord?.status === 'yes') {
      return 'selectedYes yesButton'
    } else {
      return 'notSelected'
    }
  }
  function renderAttendanceButtonNo() {
    if (props.attendanceRecord?.status === 'no') {
      return 'selectedNo'
    } else {
      return 'notSelected'
    }
  }
  function renderAttendanceButtonMaybe() {
    if (props.attendanceRecord?.status === 'maybe') {
      return 'selectedMaybe'
    } else {
      return 'notSelected'
    }
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
          {
            !props.singleEntry.isMatch ?
              <IonTitle>Practice</IonTitle>
              :
              <IonTitle>Game</IonTitle>
          }
          {/* <IonTitle>Entry for {formatDate(props.singleEntry.date)}</IonTitle> */}
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
          <IonRow>
            <IonCol size='12' className="titleColumn" >
              <h5 className="titleText">{props.singleEntry.title}</h5>
              <IonText className='descriptionText'>{props.singleEntry.description}</IonText>
            </IonCol>
            <IonCol size='3' className="titleColumn2">
              {!weatherData ?
                <div></div>
                :
                <div>{weatherData.name}</div>
              }
            </IonCol>
          </IonRow>
          <br />
          <IonRow className='timesRow'>
            <IonCol size='12'>
              <IonText className='dateHeader' >{formatLongDate(props.singleEntry.date)}</IonText>
            </IonCol>
            <IonCol size='12'>
              <IonText className="descriptionText"> </IonText> <IonText>{formatTime(props.singleEntry.startTime)}</IonText>

              <IonText className="descriptionText"> To </IonText><IonText> {formatTime(props.singleEntry.endTime)}</IonText>
            </IonCol>
          </IonRow>
          {!props.singleEntry.attendanceRequired ?
            <div></div>
            :
            props.singleEntry.attendanceRequired === true ?
              <IonRow className="attendanceRow">
                <IonCol size="6">
                  <IonText className='descriptionText' >Attending? </IonText>
                </IonCol>
                <IonCol size="6" className='attendingButtons'>
                  <IonButton
                    size='small'
                    className={renderAttendanceButtonYes()}
                    onClick={() => handleAttendingResponse('yes')}
                  >Yes</IonButton>
                  <IonButton
                    size='small'
                    className={renderAttendanceButtonNo()}
                    onClick={() => handleAttendingResponse('no')}
                  >No</IonButton>
                  <IonButton
                    size='small'
                    className={renderAttendanceButtonMaybe()}
                    onClick={() => handleAttendingResponse('maybe')}
                  >Maybe</IonButton>
                </IonCol>
                {/* <IonCol size="8">
                  <IonButton
                    onClick={() => handleAttendingResponse('yes')}
                  >Yes</IonButton>
                  <IonButton
                    onClick={() => handleAttendingResponse('no')}
                  >No</IonButton>
                  <IonButton
                    onClick={() => handleAttendingResponse('Maybe')}
                  >Maybe</IonButton>
                </IonCol> */}
                <IonCol size='12' className='arrowIcon' onClick={() => setShowAttendees(!showAttendees)} >
                  {
                    showAttendees ?
                      <IonIcon icon={upArrow} />
                      :
                      <IonIcon icon={downArrow} />
                  }
                </IonCol>
                {
                  showAttendees ?
                    <IonRow className="attendanceListRow">
                      <AttendingDetails />
                    </IonRow>
                    :
                    <div></div>
                }


              </IonRow>
              :
              <div></div>
          }
          {props.singleEntry.isMatch === true ?
            <IonRow className='scoreRow'>
              <IonCol>
                <IonText className='descriptionText' >Final Score:</IonText>
              </IonCol>
              <IonCol>
                {props.singleEntry.result}
              </IonCol>
            </IonRow>
            :
            <div></div>
          }
          {props.singleEntry.location ?
            <IonRow className='locationRow'>
              <IonCol size='6'>
                <IonText className='descriptionText'>Location:</IonText>
              </IonCol>
              <IonCol size='6'>
                <IonText> {props.singleEntry.location}</IonText>
              </IonCol>
              {!props.singleEntry.coordinance ?
                <div></div>
                :
                <MapComponent coordinance={props.singleEntry.coordinance} />
              }
            </IonRow>
            :
            <IonRow className='locationRow'>
              <div></div>
            </IonRow>
          }
          <IonRow>
            <IonCol size='12'>
              <EventChat />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
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
  allAtendees: state.team.eventAttendance,
});

export default connect(mapStateToProps,
  { getSingleEvent, resetSingleEntry, addAttendanceResponse, getAttendance, getAllAttendees })(EntryPage);



  //  import {
  //   IonBackButton,
  //   IonButton,
  //   IonButtons,
  //   IonCol,
  //   IonContent,
  //   IonGrid,
  //   IonHeader,
  //   IonIcon,
  //   IonPage,
  //   IonRow,
  //   IonText,
  //   IonTitle,
  //   IonToolbar,
  //   useIonViewWillEnter,
  // } from "@ionic/react";
  // import React, { useState, useEffect } from "react";
  // import { useHistory, useParams } from "react-router";
  // import { formatDate, formatTime } from "../utils/helpers";
  // import { trash as trashIcon, create as createIcon, chevronDown as downArrow, chevronUp as upArrow } from "ionicons/icons";
  // import { Modal } from '../shared/Modal';
  // import { connect } from "react-redux";
  // import { getSingleEvent } from "../actions/EventsAction";
  // import { resetSingleEntry } from '../actions/EventsAction';
  // import { addAttendanceResponse, getAttendance } from '../actions/TeamActions'

  // import './entryPage.css'
  // import AttendingDetails from "../components/AttendingDetails";
  // import { getAllAttendees } from './../actions/TeamActions';
  // import MapComponent from "../components/MapComponent";
  // import EventChat from "../components/EventChat";
  // import { WeaterComponent } from "../components/WeatherComponent";

  // interface RouterParams {
  //   id: string;
  // }

  // const EntryPage: React.FC = (props: any) => {
  //   const history = useHistory();
  //   const { id } = useParams<RouterParams>();
  //   const [entry, setEntry] = useState<any>();
  //   const [deleteing, setDeleting] = useState(false);
  //   const [userIsAdmin, setUserIsAdmin] = useState(false)
  //   const [attending, setAttending] = useState({ id: '1', status: 'no' });
  //   const [showAttendees, setShowAttendees] = useState(false)
  //   const [weatherData, setWeatherData] = useState<any>()

  //   function isUserAdminCheck() {
  //     const checkingMember = props.teamMembers.filter(member => member.id === props.currentUser.userId)

  //     if (checkingMember[0].isAdmin === true) {
  //       return true
  //     }
  //   }

  //   // async function weatherCheck() {
  //   //   await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${props.singleEntry.coordinance.lat}&lon=${props.singleEntry.coordinance.lng}&units=metric&APPID=${process.env.REACT_APP_WEATER}`)
  //   //     .then(res => res.json())
  //   //     .then(result => {
  //   //       setWeatherData(result)
  //   //       console.log(result);
  //   //     });
  //   // }

  //   useEffect(() => {
  //     const singleEntry = props.getSingleEvent(props.teamId, id)
  //     console.log('USEEFFECT for SINGLE entry effect ', singleEntry)
  //     setEntry(singleEntry);
  //     setUserIsAdmin(isUserAdminCheck())
  //     setAttending(props.getAttendance(props.teamId, id, props.currentUser.userId))
  //     props.getAllAttendees(props.teamId, id)
  //     setWeatherData(null)
  //   }, [])

  //   useEffect(() => {
  //     // will fire redux action to add to list of members attending
  //     renderAttendanceButtonYes()
  //     renderAttendanceButtonNo()
  //     renderAttendanceButtonMaybe()
  //   }, [props.attendanceRecord])


  //   const handleAttendingResponse = (responseValue) => {
  //     console.log('ATTedning response handler ', props.currentUser.curentUserDetails.userName)
  //     setAttending(responseValue)
  //     props.addAttendanceResponse(props.teamId, props.currentUserId, id, responseValue, props.currentUser.curentUserDetails.userName);
  //   }

  //   const handleDelete = async () => {
  //     console.log('handle delete')
  //     setDeleting(true)
  //     setDeleting(false);
  //     history.goBack();
  //   };

  //   const cancelDeleting = () => {
  //     console.log('DELETING CANCEL')
  //     setDeleting(false);
  //   }

  //   const gettingSingle = () => {
  //     console.log('getting siglesssss ', props.teamId, id)
  //     props.getSingleEvent(props.teamId, id)
  //   }

  //   if (!props.singleEntry) {   //|| !props?.attendanceRecord
  //     return (
  //       <div>Loading....</div>
  //     )
  //   }

  //   // if (props.singleEntry.coordinance && !weatherData) {
  //   //   weatherCheck()
  //   // }

  //   function renderAttendanceButtonYes() {
  //     if (props.attendanceRecord?.status === 'yes') {
  //       return 'selectedYes yesButton'
  //     } else {
  //       return 'notSelected'
  //     }
  //   }
  //   function renderAttendanceButtonNo() {
  //     if (props.attendanceRecord?.status === 'no') {
  //       return 'selectedNo'
  //     } else {
  //       return 'notSelected'
  //     }
  //   }
  //   function renderAttendanceButtonMaybe() {
  //     if (props.attendanceRecord?.status === 'maybe') {
  //       return 'selectedMaybe'
  //     } else {
  //       return 'notSelected'
  //     }
  //   }

  //   return (
  //     <IonPage>
  //       <IonHeader>
  //         <IonToolbar>
  //           <IonButtons slot="start">
  //             <IonBackButton />
  //           </IonButtons>
  //           {
  //             userIsAdmin ?
  //               <IonButtons slot="end">
  //                 <IonButton onClick={() => { }} routerLink={`/my/teams/team/${props.teamId}/entries/${id}/edit`}>
  //                   <IonIcon icon={createIcon} slot="icon-only" />
  //                 </IonButton>
  //                 <IonButton onClick={() => setDeleting(true)}>
  //                   <IonIcon icon={trashIcon} slot="icon-only" color='danger' />
  //                 </IonButton>
  //               </IonButtons>
  //               :
  //               <div></div>
  //           }

  //           <IonTitle>Entry for {formatDate(props.singleEntry.date)}</IonTitle>
  //         </IonToolbar>
  //       </IonHeader>
  //       <IonContent className="ion-padding">
  //         <Modal
  //           modalText={"Are you sure you want to delete this entry?"}
  //           displayModal={deleteing}
  //           onCancel={cancelDeleting}
  //           onConfirm={handleDelete}
  //         />
  //         {/* <EditModal
  //           modalText={'Editing this entry!'}
  //           displayModal={editStart}
  //           eventDetails={props.singleEntry}
  //           onConfirm={handleEditing}
  //           onCancel={CancelEditing}
  //           teamId={props.teamId}
  //           eventId={id}
  //         /> */}
  //         <IonGrid>
  //           <IonRow>
  //             <IonCol size='9' className="titleColumn" >
  //               <h4 className="titleText">{props.singleEntry.title}</h4>
  //             </IonCol>
  //             <IonCol size='3' className="titleColumn2">
  //               {!weatherData ?
  //                 <div></div>
  //                 :
  //                 <div>{weatherData.name}</div>
  //               }
  //             </IonCol>
  //           </IonRow>
  //           <IonRow className="descriptionRow">
  //             <IonCol >
  //               <p>{props.singleEntry.description}</p>
  //             </IonCol>
  //           </IonRow>
  //           <br />
  //           <IonRow className='timesRow'>
  //             <IonCol size='6'>
  //               <IonText className="description">Start's at:</IonText> <IonText>{formatTime(props.singleEntry.startTime)}</IonText>
  //             </IonCol>
  //             <IonCol size='6'>
  //               <IonText className="description">Ending at:</IonText><IonText> {formatTime(props.singleEntry.endTime)}</IonText>
  //             </IonCol>
  //           </IonRow>
  //           {!props.singleEntry.attendanceRequired ?
  //             <div></div>
  //             :
  //             props.singleEntry.attendanceRequired === true ?
  //               <IonRow className="attendanceRow">
  //                 <IonCol size="6">
  //                   <p className="description">Attending? </p>
  //                 </IonCol>
  //                 <IonCol size="6" className='attendingButtons'>
  //                   <IonButton
  //                     size='small'
  //                     className={renderAttendanceButtonYes()}
  //                     onClick={() => handleAttendingResponse('yes')}
  //                   >Yes</IonButton>
  //                   <IonButton
  //                     size='small'
  //                     className={renderAttendanceButtonNo()}
  //                     onClick={() => handleAttendingResponse('no')}
  //                   >No</IonButton>
  //                   <IonButton
  //                     size='small'
  //                     className={renderAttendanceButtonMaybe()}
  //                     onClick={() => handleAttendingResponse('maybe')}
  //                   >Maybe</IonButton>
  //                 </IonCol>
  //                 {/* <IonCol size="8">
  //                   <IonButton
  //                     onClick={() => handleAttendingResponse('yes')}
  //                   >Yes</IonButton>
  //                   <IonButton
  //                     onClick={() => handleAttendingResponse('no')}
  //                   >No</IonButton>
  //                   <IonButton
  //                     onClick={() => handleAttendingResponse('Maybe')}
  //                   >Maybe</IonButton>
  //                 </IonCol> */}
  //                 <IonCol size='12' className='arrowIcon' onClick={() => setShowAttendees(!showAttendees)} >
  //                   {
  //                     showAttendees ?
  //                       <IonIcon icon={upArrow} />
  //                       :
  //                       <IonIcon icon={downArrow} />
  //                   }
  //                 </IonCol>
  //                 {
  //                   showAttendees ?
  //                     <IonRow className="attendanceRow">
  //                       <AttendingDetails />
  //                     </IonRow>
  //                     :
  //                     <div></div>
  //                 }


  //               </IonRow>
  //               :
  //               <div></div>
  //           }
  //           {props.singleEntry.isMatch === true ?
  //             <IonRow className='scoreRow'>
  //               <IonCol>
  //                 <IonText className="description">Final Score:</IonText>
  //               </IonCol>
  //               <IonCol>
  //                 {props.singleEntry.result}
  //               </IonCol>
  //             </IonRow>
  //             :
  //             <div></div>
  //           }
  //           {props.singleEntry.location ?
  //             <IonRow className='locationRow'>
  //               <IonCol size='6'>
  //                 <IonText className="description">Location:</IonText>
  //               </IonCol>
  //               <IonCol size='6'>
  //                 <IonText> {props.singleEntry.location}</IonText>
  //               </IonCol>
  //               {!props.singleEntry.coordinance ?
  //                 <div></div>
  //                 :
  //                 <MapComponent coordinance={props.singleEntry.coordinance} />
  //               }
  //             </IonRow>
  //             :
  //             <IonRow className='locationRow'>
  //               <div></div>
  //             </IonRow>
  //           }
  //           <EventChat />
  //         </IonGrid>
  //       </IonContent>
  //     </IonPage >
  //   );
  // };

  // const mapStateToProps = (state) => ({
  //   currentUser: state.auth,
  //   currentUserId: state.auth.user.uid,
  //   teamEvents: state.team.events,
  //   teamMembers: state.team.members,
  //   teamId: state.team.team,
  //   singleEntry: state.team.singleEvent,
  //   attendanceRecord: state.team.eventAttendance,
  //   allAtendees: state.team.eventAttendance,
  // });

  // export default connect(mapStateToProps, { getSingleEvent, resetSingleEntry, addAttendanceResponse, getAttendance, getAllAttendees })(EntryPage);