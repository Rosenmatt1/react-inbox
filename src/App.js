import React, { Component } from 'react'
import './index.css'
import ToolBar from './Components/ToolBar.js'
import MessageList from './Components/MessageList.js'
import ComposeMessage from './Components/ComposeMessage.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      displayError: false,
      displayCompose: false,
      body: "",
      subject: ""
    }
  }

  fetchMessages = () => {
    return fetch('http://localhost:8082/api/messages')
      .then(res => res.json())
      .then(messages => {
        let addSelected = messages.map(message => {
          message.selected = false
          message.opened = false
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

  updates = async (id, command, prop, value) => {
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: id,
        command: command,
        [prop]: value
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
        message.opened = !message.opened
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
        message.opened = false
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
        message.opened = false
      }
      return message
    })
    this.setState({
      messages: this.state.messages
    })
    this.updates(readArray, "read", "read", false)
  }

  deleteMessage = (id) => {
    const readArray = []
    const removeMessage = this.state.messages.filter(message => {
      if (message.selected === false) {
        return id !== message.id
      }
      readArray.push(message.id)
    })
    this.setState({
      messages: removeMessage
    })
    this.updates(readArray, "delete", "delete", false)
  }

  unreadTracker = () => {
    let counter = 0
    const countUnread = this.state.messages.filter(message => {
      return message.read === false
    })
    counter = countUnread.length
    return counter
  }

  toolbarSelectAll = () => {
    const howManySelected = this.state.messages.filter(message => message.selected === true)
    const selectAll = this.state.messages.map(message => {
      howManySelected.length !== this.state.messages.length
        ? message.selected = true
        : message.selected = false
      return message
    })
    this.setState({
      messages: selectAll
    })
  }

  addLabel = (e) => {
    const newArr = []
    const label = this.state.messages.map(message => {
      if (message.selected === true && e.target.value !== "Apply label") {
        if (!message.labels.includes(e.target.value)) {
          newArr.push(message.id)
          message.labels = [...message.labels, e.target.value]
        }
      }
      return message
    })
    this.setState({
      messages: label
    })
    this.updates(newArr, "addLabel", "label", e.target.value)
  }

  // removeLabel = (e) => {
  //   const newArr = []
  //   const labelsFiltered = this.state.messages.map(message => {
  //     if (message.selected === true) {
  //       if (message.labels.includes(e.target.value)) {
  //         newArr.push(message.id)
  //         let removed = message.labels.indexOf(e.target.value)
  //         message.labels.splice(removed, 1)
  //       }
  //     }
  //     return message
  //   })
  //   this.setState({
  //     messages: labelsFiltered
  //   })
  //   this.updates(newArr, "removeLabel", "label", e.target.value)
  // }

  removeLabel = (e) => {
    const newArr = []
    const labelsFiltered = this.state.messages.map(message => {
      if (message.selected) {
        message.labels = message.labels.filter(label => label !== e.target.value)
        newArr.push(message.id)
      }
      return message
    })
    this.setState({
      messages: labelsFiltered
    })
    this.updates(newArr, "removeLabel", "label", e.target.value)
  }

  composeNewMessage = (e) => {
    e.preventDefault()
    this.setState({
      displayCompose: !this.state.displayCompose
    })
  }

  updateSubject = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  sendMessage = () => {
    var newMessage = {
      body: this.state.body,
      subject: this.state.subject,
    }
    fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(newMessage),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(res => res.json())
      .then(messages => {
        console.log(messages)
        this.setState({
          messages: [...this.state.messages, messages]
        })
        return messages
      })
  }


  render() {

    const numOfSelected = this.state.messages.filter(message => message.selected === true).length

    return (
      <div className="container">
        <ToolBar
          addLabel={this.addLabel}
          markAsReadButton={this.markAsReadButton}
          markAsUnreadButton={this.markAsUnreadButton}
          deleteMessage={this.deleteMessage}
          unreadTracker={this.unreadTracker}
          toolbarSelectAll={this.toolbarSelectAll}
          removeLabel={this.removeLabel}
          messages={this.state.messages}
          numOfSelected={numOfSelected}
          composeNewMessage={this.composeNewMessage}
        />

        {this.state.displayCompose
          ? <ComposeMessage
            sendMessage={this.sendMessage}
            updateSubject={this.updateSubject}
          />
          : ""}

        <MessageList
          messages={this.state.messages}
          markAsRead={this.markAsRead}
          markAsSelected={this.markAsSelected}
          addLabel={this.addLabel}
          markAsStarred={this.markAsStarred}
        />
        <h3 className="emptyerror">
        {this.state.displayError 
          ? "Unable to load Messages" 
          : this.state.messages.length === 0
            ? "Inbox is empty"
            : ""}
        </h3>
      </div>
    )
  }
}

export default App
