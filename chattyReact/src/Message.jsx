import React from 'react';

export default function Message(props){
  return (
    <div style={{color: props.msg.user.color}} className="message">
      <span className="message-username">
        <img width="50px" height="50px" src={props.msg.user.avatar} />
        <p>{props.msg.user.name}</p>
      </span>
      <span className="message-content">{props.msg.content}</span>
      {/*<div className="message system">
        {props.msg.type}
      </div>*/}
    </div>
  )
}
