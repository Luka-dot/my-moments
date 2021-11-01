import { SELECT_TEAM, GET_EVENTS, GET_MEMEBRS } from './types';
import { firestore } from '../firebase';
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