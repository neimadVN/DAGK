import React, { Component } from 'react';
import isImg from 'is-image-url';

const MessegeList = props => {
  let msgLst = [];
  if (props.list) {
    for (var key in props.list) {
      if (props.list.hasOwnProperty(key)) {
        let msgContent = [];
        if (isImg(props.list[key].content)) {
          msgContent.push(<a href={props.list[key].content}>{props.list[key].content}</a>)
          msgContent.push(<img src={props.list[key].content} alt="err" style={imgStyle} onError="this.style.display='none'"/>);
        } else {
          msgContent.push(props.list[key].content);
        }

        const index = props.list[key].sender == props.me.uid ?
          (
            <li class="clearfix">
              <div class="message-data align-right">
                <span class="message-data-time" ></span> &nbsp; &nbsp;
              <span class="message-data-name" >{props.me.displayName}</span>
                <i class="fa fa-circle me"></i>
              </div>
              <div class="message other-message float-right">
                {msgContent}
            </div>
            </li>
          ) :
          (
            <li>
              <div class="message-data">
                <span class="message-data-name"><i class="fa fa-circle online"></i> {props.other.displayName}</span>
                <span class="message-data-time"></span>
              </div>
              <div class="message my-message">
                {msgContent}
            </div>
            </li>
          )
        msgLst.push(index);
      }
    }
  }


  return (
    <ul>
      {msgLst}
    </ul>
  )
}

const imgStyle = {
  maxWidth: "100%"
};

export default MessegeList;