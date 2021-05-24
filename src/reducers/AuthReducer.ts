import {
  LOG_IN,
  GET_MEMORIES
} from "../actions/types";

const initialState = {
  loggedIn: false
};



// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
      };

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
