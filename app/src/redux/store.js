import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { roomReducer } from './reducers/roomReducer';

const rootReducer = combineReducers({
    authReducer: authReducer,
    roomReducer: roomReducer,
})

export const store = createStore(rootReducer,(applyMiddleware(thunk)))