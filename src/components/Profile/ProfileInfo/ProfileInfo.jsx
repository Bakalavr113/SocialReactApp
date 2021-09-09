import React from "react";
import { Preloader } from "../../common/Preloader/preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  } else {
    return (
      <div>
       
        <div className={s.descriptionBlock}>
        
          <img src={props.profile.photos.small} alt="" />

          {props.profile.fullName}
        </div>
        <div>
           <ProfileStatus/>
        </div>
      </div>
    );
  }
};

export default ProfileInfo;
