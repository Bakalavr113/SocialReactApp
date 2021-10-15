import React from "react";
import "./App.css";
import Navbar from "./components/NavBar/NavBar";
import ProfileContainer from "./components/Profile/ProfileContainer";
import { Route, Switch, withRouter } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/common/Login/Login";
import { compose } from "redux";
import { connect } from "react-redux";
import { InitilaizeApp } from "./redux/app-reducer";
import { Preloader } from "./components/common/Preloader/preloader";
import { FriendsContainer } from "./components/Friends/FriendsContainer";

class App extends React.Component {
  componentDidMount() {
    this.props.InitilaizeApp();
  }
  render() {
    if (this.props.initialized === false) {
      return <Preloader />;
    }
    else{
      return (
        <div className="app-wrapper">
          <HeaderContainer />
         
  
          <div className="app-wrapper-content">
            <Switch>
              <Route path="/dialogs" component={DialogsContainer} />
  
              <Route
                
                path="/profile/:userId?"
                component={ProfileContainer}
              />
            
              <Route path="/users" component={UsersContainer} />
              <Route path="/login" component={Login} />
              <Route path="/friends" component={FriendsContainer} />
            </Switch>
          </div>
        </div>
      );
    }
   
  }
}
const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});
export default compose(
  withRouter,
  connect(mapStateToProps, { InitilaizeApp })
)(App);
