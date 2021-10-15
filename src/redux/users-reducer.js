import { userAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const FOLLOWING_IN_PROGRES= "FOLLOWING_IN_PROGRES";
export const ASYNC_GET_USERS = "ASYNC_GET_USERS"
export const ASYNC_GET_FRIENDS = "ASYNC_GET_FRIENDS"
const IS_FRIENDS = "IS_FRIENDS"
const SET_CURRENT_PAGE_FRIENDS ="SET_CURRENT_PAGE_FRIENDS"
let initialState = {
    users: [ ],
    pageSize: 5,
    totalUserCount: null,
    currentPage: 1,
    curentPageFriends: 1,
    followingInProgres: [],
    isFetching: true,
    isFriends: false
    
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( u =>  {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( u =>  {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return { ...state, users: action.users }  // ...state.users,
        }
        case FOLLOWING_IN_PROGRES: {
            return { 
                ...state,
                followingInProgres: action.isProgres
                 ? [...state.followingInProgres, action.id] :
                state.followingInProgres.filter(el => el !== action.id)}  // ...state.users,
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_CURRENT_PAGE_FRIENDS: {
            return { ...state, curentPageFriends: action.curentPageFriends }
        }
        case SET_TOTAL_USER_COUNT: {
            return {...state, totalUserCount: action.totalUserCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching }
        }
        case IS_FRIENDS: {
            return {...state, isFriends: action.isFriends }
        }
        default:
            return state;
    }
}

export const getUsersSaga  = (page,  pageSize) => ({type : ASYNC_GET_USERS, page,  pageSize})
export const setIsFriends  = (isFriends) => ({type : IS_FRIENDS, isFriends})
export const getFriendsSaga  = (page,  pageSize) => ({type : ASYNC_GET_FRIENDS, page,  pageSize})
export const followSuc = (userId) => ({type: FOLLOW, userId })
export const unfollowSuc = (userId) => ({type: UNFOLLOW, userId })
export const setUsers = (users) => ({type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setCurrentPageFriends = (curentPageFriends) => ({type: SET_CURRENT_PAGE_FRIENDS, curentPageFriends})
export const setTotalUserCount = (totalUserCount) => ({type: SET_TOTAL_USER_COUNT, totalUserCount})
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const FollowingInProgres = (isProgres, id) => ({type: FOLLOWING_IN_PROGRES, isProgres, id})
export const getUsers = (page,pageSize) => (dispatch) => {
  
        dispatch(setIsFetching(true))
        dispatch(setCurrentPage(page))
        userAPI.getUsers(page, pageSize)
            .then(data => {          
                dispatch(setUsers(data.items));
                dispatch(setTotalUserCount(data.totalCount));
                dispatch(setIsFetching(false))
            });
    
}
export const follow  = (id) => (dispatch) => {
   dispatch(FollowingInProgres(true, id))
    userAPI.followUser(id)
    .then(data => {
      if (data.resultCode === 0){
        dispatch(followSuc(id))
        dispatch(FollowingInProgres(false, id))
      }
    });
}
export const unfollow  = (id) => (dispatch) => {
    dispatch(FollowingInProgres(true, id))
    userAPI.unfollowUser(id)
    .then(data => {
      if (data.resultCode === 0){
        dispatch(unfollowSuc(id))
        dispatch(FollowingInProgres(false, id))
      }
    });
}
export default usersReducer;