import { userAPI } from "../../api/api";
import {
  setUsers,
  setTotalUserCount,
  setIsFetching,
  ASYNC_GET_USERS,
  getUsersSaga,
  setCurrentPage,
  ASYNC_GET_FRIENDS,
  setCurrentPageFriends
} from "../users-reducer";
import { call, takeEvery, put } from "redux-saga/effects";
// userAPI.getUsers(page, pageSize)
//     .then(data => {
//         dispatch(setUsers(data.items));
//         dispatch(setTotalUserCount(data.totalCount));
//         dispatch(setIsFetching(false))
// dispatch(setIsFetching(true))
// dispatch(setCurrentPage(page))
//     })
async function  getUser(page, pageSize) {
  return await userAPI.getUsers(page, pageSize).then((data) =>  data );
}

function* getUsersWorker(action) {
    yield put(setIsFetching(true))
    yield put (setCurrentPage(action.page))
  const paload = yield call(getUser,action.page, action.pageSize);
  yield put(setTotalUserCount(paload.totalCount));
  yield put(setUsers(paload.items));
 
  yield put(setIsFetching(false));
}



export function* getUsersWatcher() {
  yield takeEvery(ASYNC_GET_USERS, getUsersWorker);
}


//Friends

async function  getFriend(page, pageSize) {
  return await userAPI.getFriends(page, pageSize).then((data) =>  data );
}

function* getFriendWorker(action) {
  yield put(setIsFetching(true))
  yield put (setCurrentPageFriends(action.page))
const paload = yield call(getFriend,action.page, action.pageSize);
yield put(setTotalUserCount(paload.totalCount));
yield put(setUsers(paload.items));

yield put(setIsFetching(false));
}



export function* getFriendWatcher() {
yield takeEvery(ASYNC_GET_FRIENDS, getFriendWorker);
}