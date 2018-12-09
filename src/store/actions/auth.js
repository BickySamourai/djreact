import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START/*always as to be included, messages that it receives when we executed the authStart method*/
    };
}

export const authSucces = token => {
    return {
        type : actionTypes.AUTH_SUCCES,
        token: token
    };
}

export const authFail = error => {
    return {
        type : actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    localStorage.removeItem('token'); /* no the token? */
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}
/* Timer for the logout to take places (1 hour) */
export const checkAuthTimeout = expirationTime => {
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000) /*seconds into milisecondes */
    };
}

export const authLogin = (username, password) => {
    return dispatch => {  /* dispatch */
        dispatch(authStart()); /* authentication process has started, alert that we look at */
        axios.post('http://127.0.0.1:8000/rest-auth/login/',{
            username: username,
            password: password
        })
        .then(resp => {
            console.log(resp)
            const token = resp.data.key;
            authenticated (token);
            /*
            const expirationDate = new Date(new Date().getTime() +3600 * 1000); /*1 hour before the token expiration 
            localStorage.setItem('token',token);
            localStorage.setItem('expirationDate', expirationDate);*/
            dispatch(authSucces(token));
            dispatch(checkAuthTimeout(3600)); // we can change the date */
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    };
}

export const authSignup = (username, email, password1, password2, last_name, first_name, categories ) => {
    return dispatch => {  /* dispatch */
        dispatch(authStart()); 
        axios.post('http://127.0.0.1:8000/auth/registration/',{ /* changer l'url pour nous */ 
            username: username,
            email: email,
            password: password1,
            password2: password2,
            last_name: last_name,
            first_name: first_name,
            categories: categories
        })
        .then(resp => {
            console.log(resp)
            const token = resp.data.token;
            localStorage.setItem('user',resp.data.user)
            localStorage.setItem('categories',resp.data.categories)
            authenticated (token);
            dispatch(authSucces(token));
            dispatch(checkAuthTimeout(3600)); /* we can change the date */
            
        })
        .catch(error => {
            console.log('error')
            console.log(error)
            dispatch(authFail(error));
        })
    };
}
export const authenticated = token => {
    const expirationDate = new Date(new Date().getTime() +3600 * 1000); /*1 hour before the token expiration */
    localStorage.setItem('token',token);
    localStorage.setItem('expirationDate', expirationDate);
    
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token === undefined){
            dispatch(logout());
        }else{
            const expirationDate = new Date (localStorage.getItem('expirationDate'));
            if( expirationDate <= new Date()){
                dispatch(logout());
            }else{
                dispatch(authSucces(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) /1000));
            }
        }
    }
}