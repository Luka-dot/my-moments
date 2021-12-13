import { SELECT_TEAM, GET_EVENTS, GET_MEMEBRS, GET_TEAM_DATA, ADD_ATTENDANCE_RESPONSE, GET_ATTENDANCE, GET_ALL_ATTENDEES, CREATE_TEAM,
  GET_ALL_MEMBERS, ADD_MEMBER_TO_TEAM } from './types';
import { addMemberToSpecificTeam, firestore } from '../firebase';
import { toEntry } from '../Models';

export const userSelectedTeam = (uid) => async dispatch => {

    try {
        const teamRef = firestore
      .collection("teams")
      .doc(uid);
    await teamRef
      .onSnapshot((doc) => dispatch ({
        type: SELECT_TEAM,
        payload: doc.id,
      }));
   
    }catch(error) {
        console.log(error)
    }   
}

export const selectedTeamData = (uid) => async dispatch => {

    try {
        const teamRef = firestore
      .collection("teams")
      .doc(uid);
    await teamRef
      .onSnapshot((doc) => dispatch ({
        type: GET_TEAM_DATA,
        payload: doc.data(),
      }));
   
    }catch(error) {
        console.log(error)
    }   
}

export const createTeam = (uid, name, userData) => async dispatch => {
  try {
    const teamRef = firestore.collection('teams').add({
      name: name
  }).then(data => (
    firestore.collection('teams').doc(data.id).collection('members').add({...userData, id: uid})
  ))
  await teamRef.then(() => dispatch({
    type: CREATE_TEAM,
    payload: { name: name }
  })  )
  }catch(error) {
      console.log(error)
  }
  }

  // await teamRef.then(() => dispatch({
  //   type: CREATE_TEAM,
  //   payload: { name: name, admin: uid }
  // })  )


export const getTeamEvents = (uid) => async dispatch => {
    try {
        const entriesRef = firestore
      .collection("teams")
      .doc(uid)
      .collection("events");
    await entriesRef
      .onSnapshot(({ docs }) => dispatch ({
        type: GET_EVENTS,
        payload: docs.map(toEntry),
      }));
   
    }catch(error) {
        console.log(error)
    }   
}

export const getTeamMembers = (uid) => async dispatch => {
    try {
        const entriesRef = firestore
      .collection("teams")
      .doc(uid)
      .collection("members");
    await entriesRef
      .onSnapshot(({ docs }) => dispatch ({
        type: GET_MEMEBRS,
        payload: docs.map(toEntry),
      }));
   
    }catch(error) {
        console.log(error)
    }
   
}

export const getAllMembers = () => async dispatch => {
  console.log('GETTING THEM ALL')
    try {
        const entriesRef = firestore
      .collection("users");
    await entriesRef
      .onSnapshot(({ docs }) => dispatch ({
        type: GET_ALL_MEMBERS,
        payload: docs.map(toEntry),
      }));
   
    }catch(error) {
        console.log(error)
    }
   
}

export const addMemberToTeam = (teamId, memberId) => async dispatch => {
  console.log(teamId, memberId)
  try {
      addMemberToSpecificTeam(teamId, memberId)
  }
  
  catch(error) {
  console.log(error)
  }
}

export const getAllAttendees = (teamId, eventId) => async dispatch => {
    try {
      const entriesRef = firestore
      .collection("teams")
      .doc(teamId)
      .collection("events")
      .doc(eventId)
      .collection("attendingMembers")
      
      await entriesRef.onSnapshot(({docs}) => dispatch ({
        type: GET_ALL_ATTENDEES,
        payload: docs.map(toEntry)
    }));

    }catch(error) {
        console.log(error)
    }
   
}

export const addAttendanceResponse = (teamId, memberId, eventId, statusResponse, atendeeName) => async dispatch => {
    try {
        const entriesRef = firestore
      .collection("teams")
      .doc(teamId)
      .collection("events")
      .doc(eventId)
      .collection("attendingMembers")
      .doc(memberId)
      .set({ id: memberId, status: statusResponse, name: atendeeName })

    await entriesRef.then(() => dispatch({
      type: ADD_ATTENDANCE_RESPONSE,
      payload: { id: memberId, status: statusResponse, name: atendeeName }
    })  )
    }catch(error) {
        console.log(error)
    }
   
}

export const getAttendance = (teamId, eventId, userId) => async dispatch => {
    try {
      firestore
      .collection("teams")
      .doc(teamId)
      .collection("events")
      .doc(eventId)
      .collection("attendingMembers")
      .doc(userId)
      .get().then( snapshot => dispatch ({
        type: GET_ATTENDANCE,
        payload: snapshot.data()
    }));

      // .onSnapshot((doc) => 
    }catch(error) {
        console.log(error)
      }
    }
