import React, { useEffect, useState } from "react";

// class ProfileStatus extends React.Component {
//   state = {
//     editMode: false,
//     status: this.props.status,
//   };
//   active = () => {
//     this.setState({
//       editMode: true,
//     });
//   };
//   componentDidUpdate(prevProps, prevState){
//     if(prevProps.status !== this.props.status){
//       this.setState({
//         status: this.props.status,
//       });
//     }
//   }
//   deactive = () => {
//     this.setState({
//       editMode: false,
//     });
//     this.props.setUserStatus(this.state.status)
//   };
//   changeInput = (e) =>{
//     this.setState({
//       status: e.currentTarget.value
//     })
//   }
//   render() {
//     return (
//       <div>
//         {this.state.editMode ? (
//           <input
//             onChange={this.changeInput}
//             autoFocus={true}
//             onBlur={this.deactive}
//             type="text"
//             value={this.state.status}
//           />
//         ) : (
//           <span onDoubleClick={this.active}>
//             {this.props.status !== "" ? this.props.status : "Set your status"}
//           </span>
//         )}
//       </div>
//     );
//   }
// }

const ProfileStatus = (props) => {
  const changeInput = (e) => {
    setStatus(e.currentTarget.value);
  };
  const active = () => {
    if(props.isOwner){
      setEditMode(true);
    }
   
  };
  const deactive = () => {
    setEditMode(false);
    props.setUserStatus(status);
  };
  const [status, setStatus] = useState(props.status);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
   
      setStatus(props.status);
    
  }, [props.status]);
  return (
    <div>
      {editMode ? (
        <input
          onChange={changeInput}
          autoFocus={true}
          onBlur={deactive}
          type="text"
          value={status}
        />
      ) : (
        <span onDoubleClick={active}>
          {props.status !== "" &&  props.status !== null ? props.status : "Set your status"}
        </span>
      )}
    </div>
  );
};

export default ProfileStatus;
