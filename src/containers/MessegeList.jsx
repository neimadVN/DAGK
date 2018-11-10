import React, { Component } from 'react';

const MessegeList = props => {
  let msgLst = [];
  if (props.list) {
    for (var key in props.list) {
      if (props.list.hasOwnProperty(key)) {
        const index = props.list[key].sender == props.me.uid ?
          (
            <li class="clearfix">
              <div class="message-data align-right">
                <span class="message-data-time" ></span> &nbsp; &nbsp;
              <span class="message-data-name" >{props.me.displayName}</span>
                <i class="fa fa-circle me"></i>
              </div>
              <div class="message other-message float-right">
                {props.list[key].content}
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
                {props.list[key].content}
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

export default MessegeList;