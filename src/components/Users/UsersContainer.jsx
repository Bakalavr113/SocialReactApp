import React from 'react';
import {connect} from "react-redux";
import {
    followAC,
    setUsersAC,
    unfollowAC,
    setCurrentPageAC,
    setTotalUserCountAC,
    setIsFetchingAC
} from "../../redux/users-reducer";
import Users from "./Users";
import * as axios from "axios";
import loaderSpinner from '../../assets/images/Spinner.svg'
import {Preloader} from "../common/Preloader/preloader";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                console.log(response, 'response')
                this.props.setUsers(response.data.items);
                this.props.setAllUserCount(response.data.totalCount);
                this.props.setIsFetching(false)
            });
    }

    render() {

        let changePageNum = (pageNumber) => {
            this.props.setIsFetching(true)
            this.props.pageNumChange(pageNumber)
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
                .then(response => {
                    console.log(response, 'response')
                    this.props.setUsers(response.data.items);
                    this.props.setIsFetching(false)
                });

        }


        return (
            <>
            {this.props.isFetching ? <Preloader/> : null}
        <Users changePageNum={changePageNum}
                      totalUserCount={this.props.totalUserCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}
                      users={this.props.users}
                      isFetching={this.props.isFetching}
        />
        </>
        )


    }
}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUserCount: state.usersPage.totalUserCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}



export default connect(mapStateToProps, {
    follow: followAC,
    unfollow: unfollowAC,
    setUsers: setUsersAC,
    pageNumChange: setCurrentPageAC,
    setAllUserCount: setTotalUserCountAC,
    setIsFetching: setIsFetchingAC,
})(UsersContainer);