import React from 'react';
import Message from './Message.jsx';

const MessageList = (props) => {
    const messages = props.messages.map((message) => {
      return (<Message key={message.id} message={message} />)
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