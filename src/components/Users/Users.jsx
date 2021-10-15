import React, { useState, useEffect } from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import Pagination from "../Paginations";
import { Preloader } from "../common/Preloader/preloader";
import { useDispatch } from "react-redux";

let Users = (props) => {
  const dispatch = useDispatch()
  
  return (
    <div>
     
    
     <div>
         { props.isFetching ? <Preloader/> : (
       props.users &&   <Pagination
            pages={props.totalPages}
            setCurrentPage={props.changePageNum}
            currentPage = {props.currentPage}
          />
        )}
      </div>
    


      {props.users && props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={`/profile/${u.id}`}>
                <img
                  alt="asa"
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
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
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
             
             
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
