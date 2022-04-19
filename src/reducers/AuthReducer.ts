import {
  LOG_IN,
  LOG_OUT,
  GET_CURRENT_USER_DETAILS,
  SHOW_NAVIGATION,
  HIDE_NAVIGATION,
} from "../actions/types";

const initialState = {
  loggedIn: false,
  team: {name: null},
  curentUserDetails: {memberOfTeam: []},
  displayNavigation: true,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  console.log(action.type)
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

    case SHOW_NAVIGATION:
      return {
        ...state,
        displayNavigation: true
      }

      case HIDE_NAVIGATION:
        return {
          ...state,
          displayNavigation: false
        }

    default:
      return state;
  }
};
