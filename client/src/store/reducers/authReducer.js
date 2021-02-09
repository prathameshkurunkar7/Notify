import {LOGIN, LOGOUT, REGISTER} from '../actions/auth';

const initialState ={
    user: JSON.parse(localStorage.getItem('User')) || {},
    token: localStorage.getItem('Token') || '',
    isLoggedIn: localStorage.getItem('User') ? true : false
}

const authReducer = (state = initialState,action) =>{

    const {type,payload} = action;

    switch(type){
        case LOGIN:
            return{
                ...state,
                user:payload,
                token:payload.token,
                isLoggedIn:true
            }
        case REGISTER:
            return{
                ...state,
                user:payload,
                token:payload.token,
                isLoggedIn:true
            }
        case LOGOUT:
            return{
                ...state,
                user:{},
                token:'',
                isLoggedIn:false
            }
        default:{
            return state
        }
    }

}

export default authReducer;