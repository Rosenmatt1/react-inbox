import React, { Component } from 'react'
import './App.css'
import ToolBar from './Components/ToolBar.js'
import MessageList from './Components/MessageList.js'

class App extends Component {
  constructor() {
    super()
    this.state={
      messages: [],
      id: 0,
      body: "",
      read: false,
      starred: false,
      subject: "",
      labels: {
        0: "dev",
        1: "personal"
      },
      displayError: false
    }
  }

  fetchMessages = () => {
    return fetch('http://localhost:8082/api/messages')
      .then(res => res.json())
      .then(messages => {
        this.setState({ messages: messages })
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

  render() {

    return (
      <div className="container">
        <ToolBar />
        <MessageList 
          messages={this.state.messages}
        />
        {this.state.displayError ? "Unable to load Messages" : ""}
      </div>
    )
  }
}

export default App
