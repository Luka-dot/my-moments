import {
    GET_MEMORIES,
    GET_SINGLE_EVENT
  } from "../actions/types";
  

  const initialState = {
  };
  
  
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_MEMORIES:
        return {
          ...state,
          memories: action.payload,
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