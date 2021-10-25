import React from 'react';
import s from './Post.module.css';
import styled from "styled-components";
import userPhoto from "../../../../assets/images/user.png";
import { BTN, BTNSmall } from '../MyPosts';

const PostCard = styled.div`
padding: 10px;
border: 2px solid black;
margin-bottom: 15px;
border-radius: 10px;
display: flex;
align-items: center;
`
const PostCardImg = styled.img`
width: 50px;
height: 50px;
margin-right: 15px;
`
const PostCardText = styled.p`
font-size: 20px;
color: #2a4463;
margin-right: 15px;

`
const PostCardTextSpan = styled.span`
font-size: 20px;
color: #2a4463;
margin-right: 15px;

`
const Post = (props) => {
  const deletePost = () =>{
    props.deletePost(props.id)
  }
  return (
    <PostCard className={s.item}>
      <PostCardImg src={props.profile.photos.small || userPhoto}  />
       <div>
       <PostCardText> {props.message}</PostCardText>
          <div>
           
        <PostCardTextSpan>likes { props.likesCount }</PostCardTextSpan>
        {props.isOwner &&
        <BTNSmall onClick={deletePost}>Delete Post</BTNSmall>
        } 
       
      </div>
       </div>
     
    </PostCard>
  )
}

export default Post;