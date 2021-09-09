import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { SetProfile, getProfile } from "../../redux/profile-reducer";
import { Redirect, withRouter } from "react-router-dom";
import LoginHOC from "../common/Login/LoginHoc/LoginHOC";
import {compose} from "redux"
class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.getProfile(userId);
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}
let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
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
  }),withRouter,LoginHOC)(ProfileContainer)