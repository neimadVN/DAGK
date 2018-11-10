import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";

import broswerHistory from "../routes/history";

// var __html = require('./basehtml/index2');
// var template = { __html: __html };
import UserList from "./UserList";
import ChatBox from "./ChatBox";

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            Conversation: '',
            partner: false
        }
    }

    chooseConversation = (partner) => {
        const myUid = this.props.auth.uid;
        const constChosen = partner.uid > myUid ? partner.uid + '-' + myUid : myUid + '-' + partner.uid;
        this.setState({
            Conversation: constChosen,
            partner: partner
        });
    }

    componentWillReceiveProps({ auth }) {
        if (!auth || !auth.uid) {
            broswerHistory.replace('/login');
        }
    }

    render() {
        console.log(this.state.partner)
        const chatbox = this.state.partner ? <ChatBox
            conversation={this.state.Conversation}
            partner={this.state.partner}
        /> : '';

        return (
            <div className="container clearfix">
                <UserList chooseConversation={this.chooseConversation} />
                {chatbox}
            </div>

            // <div dangerouslySetInnerHTML={template} />
        )
    }
}

export default connect(({ firebase: { auth } }) => ({
    auth: auth
}))(ChatPage);