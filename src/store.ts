import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';

const initialState = {
    
} as any;

const middleware = [thunk.withExtraArgument({ getFirestore, getFirebase})];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;