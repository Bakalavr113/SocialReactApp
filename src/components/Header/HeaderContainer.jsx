import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import {AuthMe, setUserAuth} from "../../redux/auth-reducer"

class HeaderContainer extends React.Component{


componentDidMount(){
    this.props.AuthMe()
    // axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me/`,{withCredentials: true})
    // .then(response => { 
    //     if(response.data.resultCode === 0){
    //         let { id, email, login } = response.data.data
    //         this.props.setUserAuth(id, email, login)
    //     }
        
    // });
}

    render(){
        return(
            <Header  {...this.props} />
        )
    }
}

const mapStateToProps = (state) =>{
    return(
        {
            id: state.auth.id,
            login: state.auth.login,
            email: state.auth.email,
            isAuth: state.auth.isAuth
        }
    )
    
}

export default connect(mapStateToProps,{
    setUserAuth, AuthMe
})(HeaderContainer);