import React from 'react';
import { Preloader } from '../../common/Preloader/preloader';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    if(!props.profile){
        return (
            <Preloader/>
        )
    }
    else{

    
    return (
        <div>
            <div>
                <img
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>
            </div>
            <div className={s.descriptionBlock}>
            <img src={props.profile.photos.small} alt="" />
            
               {props.profile.fullName}
            </div>
        </div>
    )
    }
}

export default ProfileInfo;