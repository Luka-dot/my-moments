import { GET_MEMORIES } from './types';
import { firestore } from '../firebase';
import { toEntry } from '../Models';

export const getMemoriesForUser = (uid) => async dispatch => {

    try {
        const entriesRef = firestore
      .collection("users")
      .doc(uid)
      .collection("entries");
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