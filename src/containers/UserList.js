import React from "react";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";

import { compose } from "redux";
import { connect } from "react-redux";
import UserSection from "./User";

const UserList = ({ firebase, users, presence, sessions, chooseConversation }) => {
  let userList = [];
  
  for (var key in users) {
    const Conversation = (param) => {
      chooseConversation(param);
    };

    if (users.hasOwnProperty(key)) {
      const index = (
        <UserSection
          photoURL={users[key].photoURL}
          displayName={users[key].displayName}
          status={"online"}
          uid={key}
          key={key}
          chooseConversation={Conversation}
        />
      );
      userList.push(index);
    }
  }

  return (
    <div class="people-list" id="people-list">
      <div class="search">
        <input type="text" placeholder="search" />
        <i class="fa fa-search"></i>
      </div>
      <ul class="list">
        {userList}
      </ul>
    </div>
  );
};
export default compose(
  firebaseConnect([
    {
      path: "/users"
    },
    {
      path: "/presence"
    },
    {
      path: "/sessions"
    }
  ]),
  connect(state => ({
    users: state.firebase.data["users"],
    presence: state.firebase.data["presence"],
    sessions: state.firebase.data["sessions"]
  }))
)(UserList);
