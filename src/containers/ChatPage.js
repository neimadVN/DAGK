import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";

import broswerHistory from "../routes/history";

// var __html = require('./basehtml/index2');
// var template = { __html: __html };
import UserList from "./UserList";

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentWillReceiveProps({ auth }) {
        if (!auth || !auth.uid) {
          broswerHistory.replace('/login');
        }
    }

    render() {

        return (
            <UserList />
            // <div dangerouslySetInnerHTML={template} />
        )
    }
}

export default connect(({ firebase: { auth } }) => ({
    auth: auth
  }))(ChatPage);