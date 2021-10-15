import React, { useCallback, useEffect, useMemo } from 'react'
import {
    followSuc,
    setUsers,
    unfollowSuc,
    setIsFetching,
    getUsers,
    follow,
    unfollow,
    getUsersSaga,
    getFriendsSaga,
    setIsFriends
  } from "../../redux/users-reducer";
  import Users from "./Users";
  import { Preloader } from "../common/Preloader/preloader";
import LoginHOC from "../common/Login/LoginHoc/LoginHOC";
import Pagination from "../Paginations";
import { useDispatch, useSelector } from 'react-redux';
 const UsersContainer = () => {
    useEffect(() => {
        dispatch(getUsersSaga(currentPage, pageSize));
        
       }, [])
      //  useMemo(() => {
      //   let  changePageNum = (pageNumber) => {
      //       dispatch(getUsersSaga(pageNumber, pageSize))
      //      dispatch(setIsFetching(false));
      //    }
      //    return changePageNum
      //  });
       
    const dispatch = useDispatch()
  
  
    const users = useSelector(state => state.usersPage.users)
    const pageSize = useSelector(state =>state.usersPage.pageSize)
    const totalUserCount = useSelector(state =>state.usersPage.totalUserCount)
    const currentPage = useSelector(state =>state.usersPage.currentPage)
    const isFetching = useSelector(state =>state.usersPage.isFetching)
    const followingInProgres = useSelector(state =>state.usersPage.followingInProgres)
    let totalPages = Math.ceil(totalUserCount/pageSize )
    const changePageNum = 
    (pageNumber) => {  
        if(pageNumber !== currentPage){
            dispatch(getUsersSaga(pageNumber, pageSize))
          // console.log("hi")
            dispatch(setIsFetching(false));
        }
      
  }
    return (
        <>
       
       {isFetching && <Preloader /> }
       <Users
       changePageNum={changePageNum}
       followSuc={followSuc} unfollowSuc={unfollowSuc} setUsers={setUsers} setIsFetching={setIsFetching} getUsers={getUsers} follow={follow} unfollow={unfollow}   users={users} pageSize={pageSize} totalUserCount={totalUserCount} currentPage={currentPage} isFetching={isFetching} followingInProgres={followingInProgres} totalPages={totalPages}   
         
       
         
         
       />
     
     </>
    )
}
export default UsersContainer