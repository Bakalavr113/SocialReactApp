import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  const deletePost = () =>{
    props.deletePost(props.id)
  }
  return (
    <div className={s.item}>
      <img src='https://movies4maniacs.liberty.me/wp-content/uploads/sites/1218/2015/09/avatarsucks.jpg' />
        { props.message }
       
          <div>
           
        <span>like</span> { props.likesCount }
        <button onClick={deletePost}>Delete Post</button>
      </div>
    </div>
  )
}

export default Post;