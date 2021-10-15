import React, { useCallback, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { follow, followSuc, getFriendsSaga, getUsers, setIsFetching, setUsers, unfollow, unfollowSuc } from '../../redux/users-reducer'
import { Preloader } from '../common/Preloader/preloader'
import Pagination from '../Paginations'
import Users from '../Users/Users'
import { Friends } from './Friends'
// import { Friends } from './Friends'

export const FriendsContainer = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFriendsSaga(currentPage, pageSize));
        
       console.log("da")
       }, [])
  
   
   const users = useSelector(state => state.usersPage.users)
   const pageSize = useSelector(state =>state.usersPage.pageSize)
   const totalUserCount = useSelector(state =>state.usersPage.totalUserCount)
   const currentPage = useSelector(state =>state.usersPage.curentPageFriends)
   const isFetching = useSelector(state =>state.usersPage.isFetching)
   const followingInProgres = useSelector(state =>state.usersPage.followingInProgres)
   let totalPages = Math.ceil(totalUserCount/pageSize )
   const changePageNum = 
    (pageNumber) => {  
        if(pageNumber !== currentPage){
            dispatch(getFriendsSaga(pageNumber, pageSize))
            console.log("hi")
            dispatch(setIsFetching(false));
        }
      
  }

    return (
        <>
      
        <div>
            <Users    followSuc={followSuc} unfollowSuc={unfollowSuc} setUsers={setUsers} setIsFetching={setIsFetching} getUsers={getUsers} follow={follow} unfollow={unfollow}  users={users} pageSize={pageSize} totalUserCount={totalUserCount} currentPage={currentPage} isFetching={isFetching} followingInProgres={followingInProgres} totalPages={totalPages}  changePageNum={changePageNum}  />
        </div>
        
        </>
    )
}
