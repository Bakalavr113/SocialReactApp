import { ProfileeAPI } from "../../api/api";
import { call, takeEvery, put } from "redux-saga/effects";
import { setUserPhoto, SET_USER_PHOTO } from "../profile-reducer";

async function setUserAvatars(photo) {
  return  await  ProfileeAPI.setUserAvatar(photo);
}
function* setUserAvatarWorker (action) {
const paload  = yield call(setUserAvatars, action.photos)

if(paload.data.resultCode === 0){
    yield put(setUserPhoto(paload.data.data.photos))
}
}
export function* setUserAvatarWatcher() {
  yield takeEvery(SET_USER_PHOTO, setUserAvatarWorker);
}
