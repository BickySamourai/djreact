// import external modules
import { combineReducers } from "redux";
import auth from "./auth"

//import { reducer as toastrReducer } from "react-redux-toastr";

const rootReducer = combineReducers({
   auth : auth,
});

export default rootReducer;
