import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import styled from "styled-components";
export const Wrapper = styled.div`
padding: 30px;
margin-top: 20px;
margin-left: 20px;
border-radius: 10px;
-webkit-box-shadow: 0px 2px 20px 6px rgba(34, 60, 80, 0.13);
-moz-box-shadow: 0px 2px 20px 6px rgba(34, 60, 80, 0.13);
box-shadow: 0px 2px 20px 6px rgba(34, 60, 80, 0.13);
width: 500px;
transition: all 0.4s ease;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
export const Container = styled.div`

display: flex;
flex-wrap: wrap;
`
export const FlexCenter = styled.div`
align-items: center;
display: flex;
flex-direction: column;
justify-content: center;
`
const TextArea = styled.textarea`
height:100px;
resize: none;
margin-bottom: 20px;
width: 100%;
border-radius: 10px;
padding: 20px;
`
const Title = styled.h1`

`
const Full = styled.div`
    width: 100%
`
export const BTN = styled.button`
    color: white;
    background: #2479e9;
    text-decoration: none;
    font-size: 22px;
    border: 2px solid #2479e9;
    padding: 10px 20px;
    border-radius: 8px;
    transition: all 0.4s ease;
`
export const BTNSmall = styled.button`
    color: white;
    margin-top: 10px;
    background: crimson;
    text-decoration: none;
    font-size: 16px;
    border: 2px solid crimson;
    padding: 5px 10px;
    border-radius: 8px;
    transition: all 0.4s ease;
`

const MyPosts = (props) => {
    let postsElements =
        props.posts.map(  p => <Post isOwner={props.isOwner} profile={props.profile} key={p.id} id ={p.id} deletePost={props.deletePost} message={p.message} likesCount={p.likesCount}/>);

    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    }
    // let deletePost = () => {
    //     props.deletePost(id);
    // }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <Wrapper className={s.postsBlock}>
            <Full>
            <Title>Posts</Title>
            <div>
            {props.isOwner &&
                <div>
                    <TextArea type="textArea" onChange={ onPostChange } ref={newPostElement}
                              value={props.newPostText} />
               
                <div>
                    <BTN onClick={ onAddPost }>Add post</BTN>
                </div>
            </div>
}
            <div className={s.posts}>
                { postsElements }
            </div>
            </div>
            </Full>
        
            
        </Wrapper>
    )
}

export default MyPosts;