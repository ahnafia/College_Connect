// MessageList.js
import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender === 'you' ? 'my-message' : 'their-message'}`}>
          <div className="message-sender">{message.sender}</div>
          <div className="message-content">{message.content}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
