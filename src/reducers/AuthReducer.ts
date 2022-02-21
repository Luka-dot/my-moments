import {
  LOG_IN,
  LOG_OUT,
  GET_CURRENT_USER_DETAILS
} from "../actions/types";

const initialState = {
  loggedIn: false,
  team: {name: null},
  curentUserDetails: {memberOfTeam: []}
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

    default:
      return state;
  }
};
