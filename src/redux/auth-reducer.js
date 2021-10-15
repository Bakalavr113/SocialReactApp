import { stopSubmit } from "redux-form";
import { getAuthApi } from "../api/api";

const SET_USER_AUTH_ME = 'SET_USER_AUTH_ME';
const LOGIN_USER = "LOGIN_USER"
let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_USER_AUTH_ME: {
            return {...state, ...action.data}
            
          
        }
       
        default:
            return state;
    }
}


export const setUserAuth = (id,email,login, isAuth) => ({type: SET_USER_AUTH_ME, data: { id, email, login, isAuth}})
export const Login = (email, password, rememberMe) => ({type: LOGIN_USER, data: { email, password, rememberMe}})
export const AuthMe = () => (dispatch) =>{
   return getAuthApi.getLogin().then(data => { 
        if(data.resultCode === 0){
            let { id, email, login } = data.data
            dispatch(setUserAuth(id, email, login, true))
        }
        
    })
}
export const LoginUser = ( email, password, rememberMe) => (dispatch) =>{
    getAuthApi.LoginUser( email, password, rememberMe).then(response => { 
        if(response.data.resultCode === 0){
            
            dispatch(AuthMe())
        }
        else{
            let action = stopSubmit("login", {_error: response.data.messages})
            dispatch(action)
        }
        
    })
}

export const LogOutUser = () => (dispatch) =>{
    getAuthApi.LogOutUser().then(response => { 
        if(response.data.resultCode === 0){
            
            dispatch(setUserAuth(null, null, null, false))
        }
        
    })
}
export default authReducer;