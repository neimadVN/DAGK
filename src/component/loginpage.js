import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";

import broswerHistory from "../routes/history";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentWillReceiveProps({ auth }) {
      if (auth && auth.uid) {
        broswerHistory.replace('/chatPage');
      }
    }

    render() {

        return (
            <div>

            </div>
        )
    }
}

export default connect(({ firebase: { auth } }) => ({
  auth: auth
}))(LoginPage);