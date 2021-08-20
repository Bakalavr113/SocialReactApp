import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";

let Users = ({changePageNum, totalUserCount, pageSize, currentPage, unfollow, follow, users}) => {

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
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                follow(u.id)
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

