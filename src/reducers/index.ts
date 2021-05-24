import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
//import MemoriesReducer from './MemoriesReducers';

export default combineReducers({
    auth: AuthReducer,
//    memories: MemoriesReducer
});