import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MemoriesReducer from './MemoriesReducers';
import TeamReducer from './TeamReducer';

export default combineReducers({
    auth: AuthReducer,
    memories: MemoriesReducer,
    team: TeamReducer,
});