import React, { Component } from 'react';
import Message from '../Message';
import './Chat.css';
class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageInput: '',
      messages: []
    };
  }

  changeInputMessage = ({ target: { value } }) => {
    this.setState({ messageInput: value });
  };

  sendMessageOnEnter = ({ key }) => {
    const { messageInput, messages } = this.state;
    if (key === 'Enter') {
      if (messageInput !== '') {
        this.setState({
          messages: [{text: messageInput}, ...messages],
          messageInput: ''
        });
      }
    }
  };

  render() {
    const { messageInput, messages } = this.state;
    return (
      <div className="chat">
        <div className="message-list">
          <div className="messages">
            {messages.map((el, index) => (
              <Message key={index} text={el.text}/>
            ))}
          </div>
        </div>
        <input
          value={messageInput}
          className="input-message"
          onChange={this.changeInputMessage}
          onKeyPress={this.sendMessageOnEnter}
        />
      </div>
    );
  }
}
export default Chat;
