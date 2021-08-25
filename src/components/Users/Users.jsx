import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import * as axios from "axios";

let Users = ({changePageNum, totalUserCount, pageSize, currentPage, unfollow, follow, users, isFetching}) => {

    let pagesCount = Math.ceil(totalUserCount / pageSize)/100;

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (


    <div>

        <div>
            {
                pages.map((p) => {
                    return <span onClick={(e) => changePageNum(p)}
                                 className={currentPage && styles.pageNum}>{p}</span>
                })
            }
        </div>

        {
            users.map(u => <div key={u.id}>
                <span>
                    <div>
                      <NavLink to={`/profile/${u.id}`} >
                      <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                          </NavLink>  
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={isFetching} onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{
                                    withCredentials: true,
                                    headers:{
                                        "API-KEY": "69c734ce-3a54-41ee-9ff9-b678093c29de"
                                    }
                                })
                                .then(response => {
                                  if (response.data.resultCode === 0){
                                    unfollow(u.id)
                                  }
                                });
                            }}>Unfollow</button>
                            : <button disabled={isFetching} onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{},{
                                    withCredentials: true,
                                    headers:{
                                        "API-KEY": "69c734ce-3a54-41ee-9ff9-b678093c29de"
                                    }
                                })
                                .then(response => {
                                  if (response.data.resultCode === 0){
                                    follow(u.id)
                                  }
                                });
                              
                            }}>Follow</button>}

                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
    )
}

export default Users;

