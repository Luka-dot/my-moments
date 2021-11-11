import {
  LOG_IN,
  LOG_OUT,
  GET_CURRENT_USER_DETAILS
} from "../actions/types";

const initialState = {
  loggedIn: false,
  team: {name: null}
};



// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        userId: action.payload.uid
      };

    case LOG_OUT:
      return {
        state: initialState
      };

    case GET_CURRENT_USER_DETAILS:
      return {
        ...state,
        curentUserDetails: action.payload
      }

  //   case ADD_TECH:
  //     return {
  //         ...state,
  //         techs: [...state.techs, action.payload],
  //         loading: false
  //     };

  //   case DELETE_TECH:
  //     return {
  //       ...state,
  //       techs: state.techs.filter(tech => tech.id !== action.payload )
  //     }

  //   case SET_LOADING:
  //     return {
  //       ...state,
  //       loading: true,
  //     };

  //   case TECHS_ERROR:
  //       console.error(action.payload)
  //       return {
  //           ...state,
  //           error: action.payload,
  //           loading: false
  //       }

    default:
      return state;
  }
};
