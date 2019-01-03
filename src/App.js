import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state={
      displayError: false
    }
  }

  fetchMessages = () => {
    return fetch('http://localhost:8082/api/messages')
      .then(res => res.json())
      .then(todos => {
        this.setState({ todos: todos })
        return todos
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
      <div>

        {this.state.displayError ? "Unable to load Messages" : ""}
      </div>
    )
  }
}

export default App
