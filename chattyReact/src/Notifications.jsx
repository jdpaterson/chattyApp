import React from 'react';

export default function Notification(props){
  return (
    <div className="notification">
      <span className="notification-content"><em>{props.msg.content}</em></span>
    </div>
  )
}
