import {UPLOAD_FILE, UPLOAD_SUBMIT, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAIL} from "../actions/actionTypes";
import * as actionTypes from '../../redux/actions/actionTypes';


const initialState = {
  token: localStorage.getItem('token'),
  error: null,
  loading: false,
  filePath: null
}


const uploadReducer = (state = initialState,action) => {
  console.log(action.type)
  switch(action.type){
    case UPLOAD_FILE : return {...state, filePath : action.data.filePath};
    case UPLOAD_SUBMIT : return {}
    default:
      return state; // don't do anything just return the state
  }
}

export default uploadReducer;