import React, { Component } from 'react'
// import './App.css'
import './index.css'
import ToolBar from './Components/ToolBar.js'
import MessageList from './Components/MessageList.js'
import Message from './Components/Message.js'

class App extends Component {
  constructor() {
    super()
      this.state={
        messages: [],
        messageSelected: [],
        // id: 0,
        // body: "",
        // read: false,
        // starred: false,
        // subject: "",
        // labels: {
        //   0: "dev",
        //   1: "personal"
        // },
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

  markAsRead = (index) => {
   let read = this.state.messages.filter(message => {
    return index.message.id  === message.id 
   })
  //  console.log(read)
   read[0].read === false ? read[0].read = true : read[0].read = false
    this.setState({
      messageSelected: read
    })
  }


 

  render() {

    return (
      <div className="container">
        <ToolBar 
          
        />
       
        <MessageList 
          messages={this.state.messages}
          markAsRead={this.markAsRead}
        />
        {this.state.displayError ? "Unable to load Messages" : ""}
      </div>
    )
  }
}

export default App
