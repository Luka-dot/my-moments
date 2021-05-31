import { LOG_IN } from './types';
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
        const returnCredentials = await auth.signInWithEmailAndPassword("test@test.com", "123456")
     
        dispatch ({
            type: LOG_IN,
            payload: returnCredentials.user,
        })
    }catch(error) {
        console.log(error)
    }
}