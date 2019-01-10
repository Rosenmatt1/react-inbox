import React, { Component } from 'react'
import '../index.css'
import Message from './Message.js'


class MessageList extends Component {

  render() {

    return (
      <div>
        {this.props.messages.map((message, idx) => {
          return <Message
            key={idx}
            message={message}
            markAsRead={this.props.markAsRead}
            markAsSelected={this.props.markAsSelected}
            markAsStarred={this.props.markAsStarred}
          />
        })}
      </div>
    )
  }
}

export default MessageList