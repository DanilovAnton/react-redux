import React, { Component } from 'react';
import Message from '../Message';
import './Chat.css';
class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageInput: '',
      messageList: []
    };
  }

  handleChangeInput = ({ target: { value } }) => {
    this.setState({ messageInput: value });
  };

  hanldeKeyPress = ({ key }) => {
    const { messageInput, messageList } = this.state;
    if (key === 'Enter') {
      if (messageInput !== '') {
        this.setState({
          messageList: [messageInput, ...messageList],
          messageInput: ''
        });
      }
    }
  };

  render() {
    const { messageInput, messageList } = this.state;
    return (
      <div className="chat">
        <div className="message-list">
          <div className="messages">
            {messageList.map((el, index) => (
              <Message key={index}>{el}</Message>
            ))}
          </div>
        </div>
        <input
          value={messageInput}
          className="input-message"
          onChange={this.handleChangeInput}
          onKeyPress={this.hanldeKeyPress}
        />
      </div>
    );
  }
}
export default Chat;
