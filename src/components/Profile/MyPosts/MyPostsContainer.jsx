import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator,deletePostActionCreater} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {compose} from "redux"
import { render } from '@testing-library/react';
import { withRouter } from 'react-router';

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action);
        },
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        deletePost: (id) => {
            dispatch(deletePostActionCreater(id));
        }
    }
}

class MyPostsContainer extends React.Component{
    render (){
     return  <MyPosts {...this.props} />
    }
}


export default compose(connect(mapStateToProps, mapDispatchToProps),withRouter)(MyPostsContainer);

