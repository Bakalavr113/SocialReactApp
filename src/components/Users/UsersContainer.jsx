import React from 'react';
import {connect} from "react-redux";
import {
    followSuc,
    setUsers,
    unfollowSuc,
    setIsFetching,
    getUsers,
    follow,
    unfollow
} from "../../redux/users-reducer";
import Users from "./Users";
import {Preloader} from "../common/Preloader/preloader";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
        // this.props.setIsFetching(true)
        // userAPI.getUsers(this.props.currentPage, this.props.pageSize)
        //     .then(data => {
               
        //         this.props.setUsers(data.items);
        //         this.props.setAllUserCount(data.totalCount);
        //         this.props.setIsFetching(false)
        //     });
    }

    render() {

        let changePageNum = (pageNumber) => {
            this.props.getUsers(pageNumber, this.props.pageSize)
            // this.props.setIsFetching(true)
            // this.props.pageNumChange(pageNumber)
            // userAPI.getUsers(pageNumber, this.props.pageSize)
            //     .then(data => {
               
            //         this.props.setUsers(data.items);
            //         this.props.setIsFetching(false)
            //     });

        }


        return (
            <>
            {this.props.isFetching ? <Preloader/> : null}
        <Users changePageNum={changePageNum}
                    {...this.props}
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
        isFetching: state.usersPage.isFetching,
        followingInProgres: state.usersPage.followingInProgres
    }
}



export default connect(mapStateToProps, {
    followSuc,
    unfollowSuc,
    setUsers,
    setIsFetching,
    getUsers,
    follow,
    unfollow
})(UsersContainer);