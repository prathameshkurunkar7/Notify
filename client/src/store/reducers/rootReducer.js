import { combineReducers } from 'redux';
import authReducer from './authReducer';
import noteReducer from './noteReducer';

export default combineReducers({
    authReducer,
    noteReducer
});