import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';

const rootReducer = combineReducers({
    authReducer: authReducer,
})

export const store = createStore(rootReducer,(applyMiddleware(thunk)))