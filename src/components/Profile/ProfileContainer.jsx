import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { SetProfile, getProfile ,getUserStatus, setUserStatus, setUserPhoto,setEditPrifleData} from "../../redux/profile-reducer";
import { Redirect, withRouter } from "react-router-dom";
import LoginHOC from "../common/Login/LoginHoc/LoginHOC";
import {compose} from "redux"
class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {

      userId = this.props.AuthUserId;
      if(!userId){

        this.props.history.push("/login")
      }
    }
    this.props.getProfile(userId);
  this.props.getUserStatus(userId)
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.match.params.userId !== prevProps.match.params.userId){
      let userId = this.props.match.params.userId;
      if (!userId) {
  
        userId = this.props.AuthUserId;
        if(!userId){
  
          this.props.history.push("/login")
        }
      }
     
      this.props.getProfile(userId);
    this.props.getUserStatus(userId)
  
    }
   
  }

  render() {
    return <Profile setEditPrifleData={this.props.setEditPrifleData} setUserPhoto={this.props.setUserPhoto} isOwner={!this.props.match.params.userId} {...this.props} profile={this.props.profile} status={this.props.status} setUserStatus = {this.props.setUserStatus} />;
  }
}
let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.userStatus,
    AuthUserId: state.auth.id,
    isAuth: state.auth.isAuth
  };
};
 
// let withRouterUsersComponent = withRouter(LoginHOC(ProfileContainer));

// export default connect(mapStateToProps, {
//   SetProfile,
//   getProfile,
// })(withRouterUsersComponent);
export default compose(connect(mapStateToProps, {
    SetProfile,
    getProfile,
    getUserStatus,
    setUserStatus,
    setUserPhoto,
    setEditPrifleData
    
    
  }),withRouter)(ProfileContainer)