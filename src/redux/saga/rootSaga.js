import { all } from "redux-saga/effects";
import { setUserAvatarWatcher } from "./profileSaga";
import { getFriendWatcher, getUsersWatcher } from "./usersSaga";


export function* rootWather() {
    yield all([getUsersWatcher(), setUserAvatarWatcher(), getFriendWatcher()])
}