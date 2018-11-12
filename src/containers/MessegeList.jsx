import React, { Component } from 'react';
import isImg from 'is-image-url';
import { storage } from '../firebase-config';

class MessegeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      composingMsg: '',
      //date: moment(this.props.lastLogin).fromNow()
    };
  }


  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    {
      let msgLst = [];
      if (this.props.list) {
        for (var key in this.props.list) {
          if (this.props.list.hasOwnProperty(key)) {
            let msgContent = [];
            if (this.props.list[key].content && isImg(this.props.list[key].content)) {
              msgContent.push(<a href={this.props.list[key].content}>{this.props.list[key].content}</a>)
              msgContent.push(<img src={this.props.list[key].content} alt="err" style={imgStyle} onError="this.style.display='none'" />);
            } else if (this.props.list[key].attachment) {
              msgContent.push(<img src={this.props.list[key].attachment} alt="err" style={imgStyle} onError="this.style.display='none'" />);
            } else {
              msgContent.push(this.props.list[key].content);
            }

            const index = this.props.list[key].sender == this.props.me.uid ?
              (
                <li class="clearfix">
                  <div class="message-data align-right">
                    <span class="message-data-time" ></span> &nbsp; &nbsp;
                <span class="message-data-name" >{this.props.me.displayName}</span>
                    <i class="fa fa-circle me"></i>
                  </div>
                  <div class="message other-message float-right" style={{ wordBreak: "break-word" }}>
                    {msgContent}
                  </div>
                </li>
              ) :
              (
                <li>
                  <div class="message-data">
                    <span class="message-data-name"><i class="fa fa-circle online"></i> {this.props.other.displayName}</span>
                    <span class="message-data-time"></span>
                  </div>
                  <div class="message my-message" style={{ wordBreak: "break-word" }}>
                    {msgContent}
                  </div>
                </li>
              )
            msgLst.push(index);
          }
        }
      }


      return (
        <ul ref={el => { this.el = el; }}>
          {msgLst}
        </ul>
      )
    }
  }
}

// const MessegeList = props => {
//   let msgLst = [];
//   if (props.list) {
//     for (var key in props.list) {
//       if (props.list.hasOwnProperty(key)) {
//         let msgContent = [];
//         if (props.list[key].content && isImg(props.list[key].content)) {
//           msgContent.push(<a href={props.list[key].content}>{props.list[key].content}</a>)
//           msgContent.push(<img src={props.list[key].content} alt="err" style={imgStyle} onError="this.style.display='none'"/>);
//         } else if (props.list[key].attachment) {
//             msgContent.push(<img src={props.list[key].attachment} alt="err" style={imgStyle} onError="this.style.display='none'"/>);
//         } else {
//           msgContent.push(props.list[key].content);
//         }

//         const index = props.list[key].sender == props.me.uid ?
//           (
//             <li class="clearfix">
//               <div class="message-data align-right">
//                 <span class="message-data-time" ></span> &nbsp; &nbsp;
//               <span class="message-data-name" >{props.me.displayName}</span>
//                 <i class="fa fa-circle me"></i>
//               </div>
//               <div class="message other-message float-right" style={{ wordBreak: "break-word" }}>
//                 {msgContent}
//               </div>
//             </li>
//           ) :
//           (
//             <li>
//               <div class="message-data">
//                 <span class="message-data-name"><i class="fa fa-circle online"></i> {props.other.displayName}</span>
//                 <span class="message-data-time"></span>
//               </div>
//               <div class="message my-message" style={{ wordBreak: "break-word" }}>
//                 {msgContent}
//               </div>
//             </li>
//           )
//         msgLst.push(index);
//       }
//     }
//   }


//   return (
//     <ul>
//       {msgLst}
//     </ul>
//   )
// }

const imgStyle = {
  maxWidth: "100%"
};

export default MessegeList;