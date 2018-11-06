import React from "react";

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
//import history from '../history';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //date: moment(this.props.lastLogin).fromNow()
    };
  }
  // componentDidMount = () => {
  //   var intervalId = setInterval(async () => {
  //     await this.setState({ date: moment(this.props.lastLogin).fromNow() });
  //   }, 1000);
  // };
  // hello=()=>{
  //   if(this.props.id < this.props.auth.uid)
  //   history.replace(`/chat/${this.props.id}/${this.props.auth.uid}`);
  //   else
  //   history.replace(`/chat/${this.props.auth.uid}/${this.props.id}`);
  // }
  render() {
    return (
      <li className="clearfix">
        <img
          src={this.props.photoURL}
          alt="user_avatar"
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%"
          }}
        />
        <div className="about">
          <div className="name">{this.props.displayName}</div>
          <div className="status">
            <i className={"fa fa-circle " + this.props.status}/>
            {this.props.status}
          </div>
        </div>
      </li>
    );
  }
}

export default compose(
  firebaseConnect([
    {
      path: "/users"
    },
  ]),
  connect(state => ({
    auth: state.firebase.auth,
  }))
)(User);
