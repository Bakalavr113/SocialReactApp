import React, { useState, useEffect } from "react";
import { Preloader } from "../../common/Preloader/preloader";
import { Field, reduxForm } from "redux-form";
import s from "./ProfileInfo.module.css";

import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../assets/images/user.png";

const ProfileInfo = (props) => {
  const [editProfile, SetEditProfile] = useState(false);
  if (!props.profile) {
    return <Preloader />;
  }
  const onMainPhotoChange = (e) => {
    if (e.target.files.length) {
      props.setUserPhoto(e.target.files[0]);
      // console.log(e.target.files[0])
    }
  };
  const  onSubmit  = (values) => {
    values.userId = props.profile.userId
     props.setEditPrifleData(values)
     console.log(values)
   
  };
  return (
    <div>
      <div className={s.descriptionBlock}>
        <img
          width="100px"
          src={props.profile.photos.small || userPhoto}
          alt="userPhoto"
        />
        {props.isOwner && <input type={"file"} onChange={onMainPhotoChange} />}
        {editProfile ? <EditProfileData editProfile={editProfile} SetEditProfile={SetEditProfile}   onSubmit={onSubmit} initialValues ={props.profile} /> : <ProfileData {...props} />}
        <div>
          {props.isOwner && !editProfile && (
            <button onClick={() => SetEditProfile(true)}>
              Edit Profile
            </button>
          )}
         
        </div>

        <div></div>
      </div>
      <div>
        <ProfileStatus
          isOwner={props.isOwner}
          status={props.status}
          setUserStatus={props.setUserStatus}
        />
      </div>
    </div>
  );
};
const ProfileData = (props) => {
  return (
    <div>
      <div>Name: {props.profile.fullName}</div>
      <div>Contacts:</div>
      {Object.entries(props.profile.contacts).map(([key, value]) =>  value && <div>{key}: {value}</div>
  
      )}
    </div>
  )
}
let EditProfileData = (props) => {
  const { handleSubmit, pristine, reset, submitting, error,initialValues } = props;
  return (
    <form onSubmit={handleSubmit}>
    <div>
      <div>Contacts:</div>
      <div><Field
          name={"aboutMe"}
          // value={props.profile.AboutMe}
          type="text"
          component={renderField}
          label={"about me"}
        /></div>
         <div><Field
          name={"lookingForAJob"}
          // value={props.profile.lookingForAJob}
          type="checkbox"
          component={renderField}
          label={"looking For A Job"}
          required
        /></div>
         <div><Field
          name={"lookingForAJobDescription"}
          // value={props.profile.LookingForAJobDescription}
          type="textarea"
          component={renderField}
          label={"LookingForAJobDescription"}
        /></div>
          <div><Field
          name={"fullName"}
          // value={props.profile.fullName}
          type="textarea"
          component={renderField}
          label={"full Name"}
        /></div>
      {Object.entries(initialValues.contacts).map(([key, value]) =>  <div>  <Field
          name={`contacts.${key}`}
          key={key}
          value={value}
          type="text"
          component={renderField}
          label={key}
        /></div>
  
      )}
    </div>
    <span onClick={() =>   props.SetEditProfile(false)} > Close Form</span>
    <button   type="submit" disabled={submitting} >Save</button>
    {error && <div>{error}</div>}
    </form>
  )
}
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
   
  </div>
);
// const validate = (values) => {
//   const errors = {};
//   if (!values.password) {
//     errors.password = "Required";
//   } else if (values.password.length > 15) {
//     errors.password = "Must be 15 characters or less";
//   }
//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }
  // if (!values.age) {
  //   errors.age = "Required";
  // } else if (isNaN(Number(values.age))) {
  //   errors.age = "Must be a number";
  // } else if (Number(values.age) < 18) {
  //   errors.age = "Sorry, you must be at least 18 years old";
  // }
//   return errors;
// };
EditProfileData = reduxForm({
  // a unique name for the form
  form: "editProfileData",
  // validate, // <--- validation function given to redux-form
  // warn, //
})(EditProfileData);
export default  ProfileInfo;

