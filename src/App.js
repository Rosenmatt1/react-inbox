import React, { Component } from 'react'
// import './App.css'
import './index.css'
import ToolBar from './Components/ToolBar.js'
import MessageList from './Components/MessageList.js'

class App extends Component {
  constructor() {
    super()
      this.state={
        messages: [],
        displayError: false
      }
  }

  fetchMessages = () => {
    return fetch('http://localhost:8082/api/messages')
      .then(res => res.json())
      .then(messages => { 
        let addSelected = messages.map(message => {
          
            message.selected = false
        
          return message
        })
        this.setState({ messages: addSelected })
        return messages
      })
  }

  componentDidMount() {
    this.fetchMessages()
      .catch(err => {
        this.setState({
          displayError: true
        })
      })
  }

  updates = async (id, command, key, value) => {
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: id,
        command: command,
        [key]: value
        }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  }
  
  markAsRead = (id) => {
    let readMessage = this.state.messages.map(message => {
      if (message.id === id) {
        message.read = true
      }
      return message
    })
    this.setState({
      messages: readMessage
    })
    this.updates([id], "read", "read", true)
  }

  markAsSelected = (id) => {
    let selectedMessage = this.state.messages.map(message => {
      if (message.id === id) {
        message.selected = !message.selected
      }
      return message
    })
    this.setState({
      messages: selectedMessage
    })
  }

  // addLabel = (e) => {
  //   let selectedLabel = e.target.value
  //   let selectedMessages = this.state.messages.filter(message => message.selected)
  //   console.log(selectedLabel)
  //   this.setState({
  //     messages: selectedMessages
  //   })
  // }
  
  markAsStarred = (id) => {
    let starredMessage = this.state.messages.map(message => {
      if (message.id === id) message.starred = !message.starred
      return message
    })
    this.setState({
      messages: starredMessage
    })
    this.updates([id], "star", "star", true)
  }

  markAsReadButton = () => {
    const readArray = []
    this.state.messages.map(message => {
      if (message.selected === true) {
        this.markAsRead(message.id)
        readArray.push(message.id)
        message.selected = false
      }
      return message
    })
    this.updates(readArray, "read", "read", true)
  }

  markAsUnreadButton = () => {
    const readArray = []
    this.state.messages.map(message => {
      if (message.selected === true) {
        message.read = false
        readArray.push(message.id)
        message.selected = false
      }
      return message
    })
    this.setState({
      messages: this.state.messages
    })
    this.updates(readArray, "read", "read", false)
  }


  render() {

    return (
      <div className="container">
        <ToolBar 
          addLabel={this.addLabel}
          markAsReadButton={this.markAsReadButton}
          markAsUnreadButton={this.markAsUnreadButton}
        />
       
        <MessageList 
          messages={this.state.messages}
          markAsRead={this.markAsRead}
          markAsSelected={this.markAsSelected}
          addLabel={this.addLabel}
          markAsStarred={this.markAsStarred}
        />
        {this.state.displayError ? "Unable to load Messages" : ""}
      </div>
    )
  }
}

export default App
