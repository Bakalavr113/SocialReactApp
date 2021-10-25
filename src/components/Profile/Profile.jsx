import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import styled from "styled-components";
const Flex = styled.div`
    display: flex;

`
const Profile = (props) => {
    return (
        <Flex >
            <ProfileInfo setEditPrifleData={props.setEditPrifleData} setUserPhoto={props.setUserPhoto} isOwner = {props.isOwner} profile={props.profile} status={props.status} setUserStatus={props.setUserStatus}/>
            <MyPostsContainer isOwner={props.isOwner}  />
        </Flex>
    )
}

export default Profile;