import { LOG_IN, LOG_OUT, GET_CURRENT_USER_DETAILS } from './types';
import { auth } from '../firebase';
import { firestore } from '../firebase';
import { toEntry } from '../Models';

// export const getMemories = (dispatch) => {
//     const initialMemories = [{ title: 'new memory'}];

//     return ({
//         type: GET_MEMORIES,
//         payload: initialMemories,
//     })
// }

export const logInUser = (email, password) => async dispatch => {
    try {
        const returnCredentials = await auth.signInWithEmailAndPassword(email, password)
    //    const returnCredentials = await auth.signInWithEmailAndPassword("NewRugbyTest@test.com", "123456")

     console.log(returnCredentials.user.uid)
        dispatch ({
            type: LOG_IN,
            payload: returnCredentials.user,
        })       
    }catch(error) {
        console.log(error)
    }
}

export const getCurrentUserDetails = (uid) => async dispatch => {
    console.log('get user details ', uid)
    try {
      firestore
      .collection("users")
      .doc(uid)
      .get().then( snapshot => dispatch ({
        type: GET_CURRENT_USER_DETAILS,
        payload: snapshot.data()
    }));

    }catch(error) {
        console.log(error)
    }
}

export const logoutUser = () => async dispatch => {

        dispatch ({
            type: LOG_OUT
        })
}