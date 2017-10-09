import React, {Component} from 'react';
import ChatBar from './ChatBar';
import MessageList from './MessageList';
import { sendMessageToSever, sendUserNameChange, updateChat  } from '../socketConnect';

export default class ChatContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {
        username: 'user123',
        color: 0
      },
      messages: [],
      usersOnline: 0
    }
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
    this.onNewUsername = this.onNewUsername.bind(this);
    this.getNewMessage = this.getNewMessage.bind(this);
    this.getNewNotification = this.getNewNotification.bind(this);
    this.assignChatColor = this.assignChatColor.bind(this);
    updateChat(this.getNewMessage, this.getNewNotification, this.assignChatColor);
    this._isMounted = false;
  }
  render(){
    return (
      <div className='panel panel-default chat-container center-block'>
        <div className='panel-body'>
          <MessageList 
            messages={ this.state.messages }
          />
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
    if (!this._isMounted ){
      return;
    }
    const oldUserName = this.state.currentUser.username;
    if (oldUserName === newUsername) {
      return;
    }
    const currentUser = this.state.currentUser;
    currentUser.username = newUsername;
    this.setState({
      currentUser
    });
    sendUserNameChange(oldUserName, newUsername)
  }
  getNewMessage(newMessage){
    if (!this._isMounted ){
      return;
    }
    const incomingMessage = JSON.parse(newMessage);
    this.setState({
      messages: this.state.messages.concat(incomingMessage)
    })
  }
  getNewNotification(newNotification){
    if (!this._isMounted ){
      return;
    }
    const incomingNotification = JSON.parse(newNotification);
    // if (incomingNotification.type === 'userCountChange') {
    //   this.props.onUserCountChange(incomingNotification.userCount);
    // }
    this.setState({
      messages: this.state.messages.concat(incomingNotification)
    })
  }
  assignChatColor(color){
    console.log('color received')
    console.log(color)
    const currentUser = this.state.currentUser;
    currentUser.color = parseInt(color, 10);
    this.setState({
      currentUser
    })
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
}