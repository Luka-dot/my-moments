import {
    SELECT_TEAM,
    CREATE_TEAM,
    GET_EVENTS,
    GET_MEMEBRS,
    GET_SINGLE_EVENT,
    RESET_SINGLE_EVENT,
    GET_TEAM_DATA,
    ADD_ATTENDANCE_RESPONSE,
    GET_ATTENDANCE,
    GET_ALL_ATTENDEES,
    LISTEN_TO_EVENT_CHAT,
  } from "../actions/types";
  

  const initialState = {
    comments: []
  };
    
  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
      case SELECT_TEAM:
        return {
          ...state,
          team: action.payload,
        };

      case GET_TEAM_DATA:
        return {
          ...state,
          teamName: action.payload,
        };
      
        case CREATE_TEAM:
          return {
            ...state,
            teams: action.payload
          }

        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
            }

        case GET_MEMEBRS:
            return {
                ...state,
                members: action.payload,
            }

            case GET_SINGLE_EVENT:
              return {
                ...state,
                singleEvent: action.payload,
              }
  
            case RESET_SINGLE_EVENT:
              return {
                ...state,
                singleEvent: action.payload,
              }
            
              case ADD_ATTENDANCE_RESPONSE:
              return {
                ...state,
                eventAttendance: action.payload,
              }

              case GET_ATTENDANCE:
              return {
                ...state,
                eventAttendance: action.payload,
              }

              case GET_ALL_ATTENDEES:
                return {
                  ...state,
                  allAttendees: action.payload 
                }

              case LISTEN_TO_EVENT_CHAT: 
              return {
                ...state,
                comments: action.payload
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