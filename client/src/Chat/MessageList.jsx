import React from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

const MessageList = (props) => {
    const messages = props.messages.map((message) => {
      if ( message.type === 'message'){
        return (<Message key={message.id} message={message} />)
      } else {
        return (<Notification key={message.id} message={message}/>)
      }
    });
    return (
      <div className='panel panel-default center-block message-list'>
        <div className='panel-body'>
          { messages }
        </div>
      </div>
    )
}

export default MessageList;