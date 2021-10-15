import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};
const LoginHOC = (Components) => {
  
  class RedirectComponent extends React.Component {
    
    render() {
      if (!this.props.isAuth) {
        return <Redirect to={"/login"} />;
      }
      return <Components {...this.props} />;
    }
  }
  return connect(mapStateToProps, {})(RedirectComponent)
  
};


export default (LoginHOC);
