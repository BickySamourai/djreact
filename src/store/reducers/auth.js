/* take the state and return the piece that you need (in reducers folders)*/
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'; //to manipulate the state values

const initialState = {
    token: null,
    error: null,
    loading: false
}

const authStart = (state,action) =>{
    return updateObject(state, { 
        error: null,
        loading: true
    });
}

const authSucces = (state,action) =>{
    return updateObject(state, { 
        token: action.token, // look actions/auth.js line 10 
        error: null,
        loading: false
    });
}

const authFail = (state,action) =>{
    return updateObject(state, { 
        error: action.error,
        loading: false
    });
}

const authLogout = (state,action) =>{
    return updateObject(state, { 
        token: null
    })
}

const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCES: return authSucces(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        default:
        return state; // don't do anything just return the state
    }
}

export default reducer;