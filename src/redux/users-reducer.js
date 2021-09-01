import { userAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const FOLLOWING_IN_PROGRES= "FOLLOWING_IN_PROGRES";
let initialState = {
    users: [ ],
    pageSize: 5,
    totalUserCount: 10,
    currentPage: 1,
    followingInProgres: [],
    isFetching: false,
    
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
            return { ...state, users: [...action.users ]}  // ...state.users,
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
        case SET_TOTAL_USER_COUNT: {
            return {...state, totalUserCount: action.totalUserCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching }
        }
        default:
            return state;
    }
}


export const followSuc = (userId) => ({type: FOLLOW, userId })
export const unfollowSuc = (userId) => ({type: UNFOLLOW, userId })
export const setUsers = (users) => ({type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUserCount = (totalUserCount) => ({type: SET_TOTAL_USER_COUNT, totalUserCount})
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const FollowingInProgres = (isProgres, id) => ({type: FOLLOWING_IN_PROGRES, isProgres, id})
export const getUsers = (currentPage,pageSize) => (dispatch) => {
  
        dispatch(setIsFetching(true))
        userAPI.getUsers(currentPage, pageSize)
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