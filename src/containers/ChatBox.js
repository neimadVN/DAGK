import React from "react";
import { firebaseConnect, isLoaded, isEmpty, getVal } from "react-redux-firebase";

import { compose } from "redux";
import { connect } from "react-redux";

import MessegeList from "./MessegeList";

const enhance = compose(
    firebaseConnect(props => {
        return [
            {
                path: 'conversation/' + props.conversation
            }
        ];
    }),
    connect(({ firebase }, props) => ({
        messages: getVal(
            firebase,
            'data/conversation/' + props.conversation
        ), // lodash's get can also be used
        auth: firebase.auth,
        conversation: props.conversation,
        parterinfo: props.parterinfo
    }))
);

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            composingMsg: '',
            //date: moment(this.props.lastLogin).fromNow()
        };
    }

    inputText = (event) => {
        this.setState({ composingMsg: event.target.value });
    }

    submitMessage = () => {
        if (this.state.composingMsg && this.state.composingMsg != '') {
            this.props.firebase.push(
                'conversation/' + this.props.conversation,
                {
                    content: this.state.composingMsg,
                    chatTime: new Date(),
                    sender: this.props.auth.uid
                }
            );
            this.setState({ composingMsg: '' });
        }

    };

    render() {
        return (
            <React.Fragment>
                <div class="chat">
                    <div class="chat-header clearfix">
                        <img src={this.props.partner.photoURL} style ={{ width: "64px", height: "64px", borderRadius: "50%"}} alt="avatar" />

                        <div class="chat-about">
                            <div class="chat-with">Chat with {this.props.partner.displayName}</div>
                            <div class="chat-num-messages"></div>
                        </div>
                        <i class="fa fa-star"></i>
                    </div>

                    <div class="chat-history">
                        <MessegeList list={this.props.messages} other={this.props.partner} me={this.props.auth} />
                    </div>

                    <div className="chat-message clearfix">
                        <textarea onChange={event => this.inputText(event)} value={this.state.composingMsg} name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>

                        <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file-image-o"></i>

                        <button onClick={this.submitMessage}>Send</button>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default enhance(ChatBox);