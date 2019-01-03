import React, { Component } from 'react'
import '../App.css'
import Message from './Message.js'

class MessageList extends Component {
  render() {
    return (
      <div>
        {this.props.messages.map((message, idx) => {
          return <Message 
          idx={message.idx}
          />
        })}
        
      </div>
    )
  }
}

export default MessageList