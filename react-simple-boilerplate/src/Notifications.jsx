import React from 'react';

//Functional component for notification type messages
export default function Notification(props){
  return (
    <div className="notification">
      <span className="notification-content"><em>{props.msg.content}</em></span>
    </div>
  )
}
