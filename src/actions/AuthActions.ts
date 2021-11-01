import { LOG_IN, LOG_OUT } from './types';
import { auth } from '../firebase';

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
     
        dispatch ({
            type: LOG_IN,
            payload: returnCredentials.user,
        })
    }catch(error) {
        console.log(error)
    }
}

export const logoutUser = () => async dispatch => {

        dispatch ({
            type: LOG_OUT
        })
}