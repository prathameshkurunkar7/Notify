import { combineReducers } from 'redux';
import authReducer from './authReducer';
import noteReducer from './noteReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    authReducer,
    noteReducer,
    errorReducer
});