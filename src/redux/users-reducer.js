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


export const followAC = (userId) => ({type: FOLLOW, userId })
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId })
export const setUsersAC = (users) => ({type: SET_USERS, users })
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUserCountAC = (totalUserCount) => ({type: SET_TOTAL_USER_COUNT, totalUserCount})
export const setIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const FollowingInProgres = (isProgres, id) => ({type: FOLLOWING_IN_PROGRES, isProgres, id})

export default usersReducer;