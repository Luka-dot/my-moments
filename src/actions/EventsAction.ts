import { GET_MEMORIES, GET_SINGLE_EVENT } from './types';
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
  console.log('HEYYEYEYEY ', teamId,eventId)
    try {
      const entriesRef = await firestore
      .collection("teams")
      .doc(teamId)
      .collection("events")
      .doc(eventId)
      .get();
      const dataForEvent = await entriesRef.data()
      await dispatch({
        type: GET_SINGLE_EVENT,
        payload: dataForEvent
      })
      console.log(dataForEvent)
      
     
   
    }catch(error) {
        console.log(error)
    }
   
}