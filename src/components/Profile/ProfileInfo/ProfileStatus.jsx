import React from "react";

class ProfileStatus extends React.Component {
  state = {
    editMode: false
  }
  active = ()  => {
     
    this.setState({
       editMode: true
    })
 }
  deactive = ()  => {
     
     this.setState({
        editMode: false
     })
  }
  render() {
    return (
      <div>
        {this.state.editMode ?   <input autoFocus={true} onBlur={this.deactive} type="text" /> : <span onDoubleClick={this.active}>text</span>   }
      </div>
    );
  }
}

export default ProfileStatus;
