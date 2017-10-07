import React, {Component} from 'react';
import ChatBar from './ChatBar';
import MessageList from './MessageList';
import { sendMessageToSever, updateChat } from '../socketConnect';

export default class ChatContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {
        username: 'test user'
      },
      messages: [{id: 1, type: 'message', username: 'user1', content: 'test message 1'}, {id: 2, username: 'user2', content: 'test message 2'}]
    }
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
    this.onNewUsername = this.onNewUsername.bind(this);
    this.getNewMessage = this.getNewMessage.bind(this);
    updateChat(this.getNewMessage);
  }
  render(){
    return (
      <div className='panel panel-default chat-container center-block'>
        <div className='panel-body'>
          <MessageList messages={ this.state.messages }/>
          <ChatBar 
            user={ this.state.currentUser } 
            onSubmitMessage={ this.onSubmitMessage }
            onNewUsername={ this.onNewUsername }
          />
        </div>
      </div>
    )
  }
  onSubmitMessage(message){
    sendMessageToSever(JSON.stringify(message))
  }
  onNewUsername(newUsername){
    const curentUser = this.state.currentUser;
    curentUser.username = newUsername;
    this.setState({
      curentUser
    })
  }
  getNewMessage(newMessage){
    const incomingMessage = JSON.parse(newMessage);
    this.setState({
      messages: this.state.messages.concat(incomingMessage)
    })
  }
}