import { GET_MEMORIES, GET_SINGLE_EVENT, RESET_SINGLE_EVENT, LISTEN_TO_EVENT_CHAT } from './types';
import { firestore } from '../firebase';
import { toEntry } from '../Models';

export const getEventsForUser = (uid) => async dispatch => {

    try {
        const entriesRef = firestore
      .collection("users")
      .doc(uid)
      .collection("events");
    await entriesRef
      .orderBy("date", "desc")
      .onSnapshot(({ docs }) => dispatch ({
        type: GET_MEMORIES,
        payload: docs.map(toEntry),
      }));
   
    }catch(error) {
        console.log(error)
    }
   
}

export const getSingleEvent = (teamId, eventId) => async dispatch => {
      try {
      const entriesRef = await firestore
      .collection("teams")
      .doc(teamId)
      .collection("events")
      .doc(eventId)
      await entriesRef.onSnapshot((snapshot) => {
        dispatch({
          type: GET_SINGLE_EVENT,
          payload: snapshot.data()
        })
      })
    }catch(error) {
        console.log(error)
    }
}

// try {
//   const entriesRef = await firestore
//   .collection("teams")
//   .doc(teamId)
//   .collection("events")
//   .doc(eventId)
//   const singleEventData = await entriesRef.onSnapshot(({ data }) => ({
//     type: GET_SINGLE_EVENT,
//     payload: singleEventData
//   }))
// }catch(error) {
//     console.log(error)
// }

export const resetSingleEntry = () => async dispatch => {
    try {
      dispatch({
        type: RESET_SINGLE_EVENT,
        payload: null
      })
      
     
    }catch(error) {
        console.log(error)
    }
}

export const listenToEventChat = (comments) => async dispatch => {
 try {
   dispatch({
    type: LISTEN_TO_EVENT_CHAT,
    payload: comments
  })
  }catch(error) {
    console.log(error)
  }
}



// const entriesRef = await firestore
// .collection("teams")
// .doc(teamId)
// .collection("events")
// .doc(eventId)
// .get();
// const dataForEvent = await entriesRef.data()
// await dispatch({
//   type: GET_SINGLE_EVENT,
//   payload: dataForEvent
// })
// console.log(dataForEvent)