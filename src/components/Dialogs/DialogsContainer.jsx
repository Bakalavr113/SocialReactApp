import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import LoginHOC from '../common/Login/LoginHoc/LoginHOC';
import {compose} from "redux"
let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator());
        },
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
        }
    }
}
class DialogsContainer extends React.Component{

    render() {
        return <Dialogs {...this.props}/>
    }
}
// const DialogsContainer = LoginHOC(connect(mapStateToProps, mapDispatchToProps)(Dialogs));
export default compose(LoginHOC,connect(mapStateToProps, mapDispatchToProps))(DialogsContainer)
// export default DialogsContainer;