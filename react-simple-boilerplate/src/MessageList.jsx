import React from 'react';
import Message from './Message.jsx';
import Notification from './Notifications.jsx';

export default function MessageList(props){
  //Render the messages and notifications
  const msgItems = props.messages.map((msg) => {
    let reactVal;
    if (msg.type === 'notification'){
      reactVal = (<Notification key={msg.id} msg={msg} />);
    }else if (msg.type === 'message'){
      reactVal = (<Message key={msg.id} msg={msg} />);
    }
    return reactVal;
  });

  return (
    <main className="messages">
      {msgItems}
    </main>
  );
}
