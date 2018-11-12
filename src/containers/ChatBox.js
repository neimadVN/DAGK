import React from "react";
import { firebaseConnect, isLoaded, isEmpty, getVal } from "react-redux-firebase";

import { compose } from "redux";
import { connect } from "react-redux";
import {storage} from "../firebase-config";

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
        ),
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

    buttonDown = (event) => {
        if (event.keyCode == 13) {
            this.submitMessage();   
        }
    }

    uploadImage = async (event) => {
        const name = new Date().getTime();
        const file = event.target.files[0]
        var blob = file.slice(0, -1, file.type);
        console.log(blob);
        let newFile = new File([blob], name, {
            type: file.type
        });
        console.log(newFile);
        this.props.firebase
            .uploadFile("", newFile, "")
            .then(async () => {
                const url = await imageNameToURL(name);
                this.submitMessage(url);
            })
            .catch(error => {
                console.log(error);
            });
    }

    submitMessage = (imageName) => {
        if (imageName) {
            this.props.firebase.push(
                'conversation/' + this.props.conversation,
                {
                    attachment: imageName,
                    chatTime: new Date(),
                    sender: this.props.auth.uid
                }
            );
        } else 
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
                        <textarea onKeyDown={event => this.buttonDown(event)} onChange={event => this.inputText(event)} value={this.state.composingMsg} name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>

                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                    <span>
                        <label for="upload-photo"><i className="fa fa-file-image-o"/></label>
                        <input
                            onChange={event => {this.uploadImage(event)}}
                            style={{padding: "-10px -10px", display: "none"}}
                            type="file"
                            id="upload-photo"
                            accept="image/*"
                        >
                        </input>
                    </span>

                        <button onClick={this.submitMessage}>Send</button>
                        
                        {/* { <button onClick={() => {imageNameToURL(1542032827073)}}>Send</button> } */}

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default enhance(ChatBox);

function imageNameToURL(name) {
  return new Promise((resolve) => {
    storage
    .child(String(name))
    .getDownloadURL()
    .then(url => {
      console.log(url);
      resolve(url);
    })
    .catch(function (error) {
      console.log(error);
      resolve('');
    });
  });
};