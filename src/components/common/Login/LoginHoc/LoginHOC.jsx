import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
const mapStateToProps = (state) => {
    return {
      isAuth: state.auth.isAuth,
    };
  };
const LoginHOC = (Component) => {
    
  class RedirectComponent extends React.Component {
    render() {
      if (this.props.isAuth === false) {
        return <Redirect to={"/login"} />;
      }
      return <Component {...this.props} />;
    }
  }
  return connect(mapStateToProps)(RedirectComponent)
  
};


export default (LoginHOC);
