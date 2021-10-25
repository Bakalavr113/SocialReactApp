import React, { useState, useEffect } from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import Pagination from "../Paginations";
import { Preloader } from "../common/Preloader/preloader";
import { useDispatch } from "react-redux";
import { Container, FlexCenter, Wrapper } from "../Profile/MyPosts/MyPosts";

let Users = (props) => {
  const dispatch = useDispatch()
  
  return (
    <FlexCenter>
     
     <div>
         { props.isFetching ? <Preloader/> : (
       props.users &&   <Pagination
            pages={props.totalPages}
            setCurrentPage={props.changePageNum}
            currentPage = {props.currentPage}
          />
        )}
      </div>
    

          <Container>
          {props.users && props.users.map((u) => (
        <div key={u.id}>
        <Wrapper>
          
              <NavLink to={`/profile/${u.id}`}>
                <img
                  alt="asa"
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  className={styles.userPhoto}
                />
              </NavLink>
            
          
              {u.followed ? (
                <button
                  disabled={props.followingInProgres.some((id) => id === u.id)}
                  onClick={() => {
                    dispatch( props.unfollow(u.id));
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgres.some((id) => id === u.id)}
                  onClick={() => {
                    dispatch(props.follow(u.id));
                  }}
                >
                  Follow
                </button>
              )}
           
           
              <div>{u.name}</div>
              <div>{u.status}</div>
           
           
             
             
           
            </Wrapper>
        
        </div>
      ))}

          </Container>
    
    </FlexCenter>
  );
};

export default Users;
