import {
    SELECT_TEAM,
    GET_EVENTS,
    GET_MEMEBRS,
    GET_SINGLE_EVENT,
  } from "../actions/types";
  

  const initialState = {
  };
  
  
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state = initialState, action) => {
    switch (action.type) {
      case SELECT_TEAM:
        return {
          ...state,
          team: action.payload,
        };

        case GET_EVENTS:
          console.log(action.payload)
            return {
                ...state,
                events: action.payload,
            }

        case GET_MEMEBRS:
          console.log(action.payload)
            return {
                ...state,
                members: action.payload,
            }

            case GET_SINGLE_EVENT:
              return {
                ...state,
                singleEvent: action.payload,
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