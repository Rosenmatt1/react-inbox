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
          if (!message.selected) {
            message.selected = false
            return message
          } else {
            return message
          }
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

//   let message = {
//       messageIds: [id],
//       command: "read",
//       "read": true
//     }

//   updates = async (id, command, key, value) => {
//   await fetch('http://localhost:8082/api/messages', {
//   method: 'PATCH',
//   body: JSON.stringify({
//     messageIds: [id],
//     command: "read",
//     "read": true
//   }),
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   }
// })
//   }
  

  markAsRead = (id) => {
    let readMessage = this.state.messages.map(message => {
      if (message.id === id) {
        message.read = !message.read
      }
      return message
    })
    this.setState({
      messages: readMessage
    })
  }

 
  // markAsRead = (index) => {
  //   let read = this.state.messages.filter(message => {
  //     return index.message.id === message.id
  //   })
  //   read[0].read === false ? read[0].read = true : read[0].read = false
  //   this.setState({
  //     messages: this.state.messages
  //   })
  // }


    
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
  }

  // markAsReadButton = () => {
  //   // e.preventDefault()
    
  //   const selectedMessages = this.state.messages.filter(message =>{
  //     return message.selected === true
  //   })
  //   selectedMessages.forEach(message => this.markAsRead(message, id))
  //   console.log(selectedMessages)
  // }


  render() {

    return (
      <div className="container">
        <ToolBar 
          addLabel={this.addLabel}
          markAsReadButton={this.markAsReadButton}
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
