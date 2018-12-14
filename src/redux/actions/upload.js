import {UPLOAD_SUBMIT, UPLOAD_FILE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAIL} from './actionTypes';
import ApiUpload from "../../services/apiUpload";


export const onSubmit = (title, artist, description, categorie, album, file) => {
  ApiUpload.upload_file(title, artist, description, categorie, album, file)
    .then(response => {
      console.log(response);

    })
};

export const uploadSuccess =  (path) => {
  return {
    type : UPLOAD_FILE_SUCCESS,
    payload: { path }
  };
}

export const uploadFail = (error) => {
  return {
    type : UPLOAD_FILE_FAIL,
    error
  }
}

export const onUploadFile = (file) => {

}