// import { stopSubmit } from "redux-form";
// import { getAuthApi } from "../api/api";
import { AuthMe } from "./auth-reducer";

const SET_USER_INITILAIZED = "SET_USER_AUTH_ME";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INITILAIZED: {
      return { ...state, initialized: true };
    }

    default:
      return state;
  }
};

export const setInitilaizedApp = () => ({ type:  SET_USER_INITILAIZED});



export const InitilaizeApp = () =>  async (dispatch) => {
   let promise = await dispatch(AuthMe());
    // Promise.all([promise]).then( () => {
    //   dispatch(setInitilaized())
    // })
    dispatch(setInitilaizedApp ())
        
    

};
export default appReducer;
