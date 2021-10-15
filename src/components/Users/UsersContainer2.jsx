import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

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

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsersSaga(this.props.currentPage, this.props.pageSize);
    //  this.props.setIsFetching(false);
  }
  
  
  render() {
    let totalPages = Math.ceil(this.props.totalUserCount/this.props.pageSize)
    let changePageNum = (pageNumber) => {
      this.props.isFriends ? this.props.getFriendsSaga(pageNumber, this.props.pageSize) :
      this.props.getUsersSaga(pageNumber, this.props.pageSize);
      this.props.setIsFetching(false);
    };
   
    console.log(this.props.totalPages)
    return (
      <>
         <div>
         { this.props.isFetching ? <Preloader/> : (
       this.props.users &&   <Pagination
            pages={totalPages}
            setCurrentPage={changePageNum}
            currentPage = {this.props.currentPage}
          />
        )}
      </div>
        {this.props.isFetching && <Preloader /> }
        <Users
          changePageNum={changePageNum}
            // getFriendsOnly={getFriendsOnly}
          {...this.props}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          
        />
      
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUserCount: state.usersPage.totalUserCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgres: state.usersPage.followingInProgres,
    totalPages: Math.ceil(
      state.usersPage.totalUserCount / state.usersPage.pageSize
    ),
  };
};

export default compose(
  LoginHOC,
  connect(mapStateToProps, {
    followSuc,
    unfollowSuc,
    setUsers,
    setIsFetching,
    getUsers,
    follow,
    unfollow,
    getUsersSaga,
    getFriendsSaga,
    setIsFriends
  })
)(UsersContainer);
