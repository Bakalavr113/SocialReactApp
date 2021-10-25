import { stopSubmit } from "redux-form";
import { ProfileeAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
export const SET_PROFILE = "SET_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const DELETE_POST = "DELETE_POST";
 export const SET_USER_PHOTO = "SET_USER_PHOTO"
let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 11 },
    { id: 4, message: "Dada", likesCount: 11 },
  ],
  newPostText: "",
  profile: null,
  userStatus: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: state.posts.length + 1,
        message: state.newPostText,
        likesCount: 0,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }
    case UPDATE_NEW_POST_TEXT: {
      return {
        ...state,
        newPostText: action.newText,
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: [...state.posts.filter((post) => post.id !== action.id)],
      };
    }
    case SET_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_USER_STATUS: {
      return {
        ...state,
        userStatus: action.userStatus,
      };
    }
    case SET_USER_PHOTO: {
      return {
        ...state, profile: {...state.profile, photos: action.photos}
      };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const setUserPhoto = (photos) => ({ type: SET_USER_PHOTO, photos });
export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});
export const deletePostActionCreater = (id) => ({
  type: DELETE_POST,
  id: id,
});

export const SetProfile = (profile) => ({
  type: SET_PROFILE,
  profile: profile,
});
export const setStatus = (userStatus) => ({
  type: SET_USER_STATUS,
  userStatus: userStatus,
});

//THUNK
export const getProfile = (userId) => async (dispatch) => {
const  data = await ProfileeAPI.getProfile(userId)
   return  dispatch(SetProfile(data));
 ;
};
export const getUserStatus = (userId) => (dispatch) => {
  ProfileeAPI.getSatus(userId).then((data) => {
    dispatch(setStatus(data));
  });
};
export const setUserStatus = (status) => (dispatch) => {
  ProfileeAPI.setStatus(status).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};
export const setEditPrifleData = (values) => (dispatch) => {
 return  ProfileeAPI.UpdateProfileData(values).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(getProfile(values.userId))
    }
    else{
      let action = stopSubmit( {_error: response.data.messages})
            dispatch(action)
    }
  });
};
// export const setUserPhotoThunk =  (photo) => async (dispatch) => {
//  ProfileeAPI.setUserAvatar(photo).then(response => {
//   if(response.data.resultCode === 0){
//     dispatch(setUserPhoto(response.data.data.photos))
//  }
//  });
  
// };
export default profileReducer;
