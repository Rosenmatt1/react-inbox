import React, { Component } from 'react'
// import '../App.css'
import '../index.css'

class Message extends Component {

  render() {

    return (
      <div className={this.props.read ? "row message read" : "row message unread"}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" />
            </div>
            <div className="col-xs-2">
              <i className="star fa fa-star-o"></i>
            </div>
          </div>
        </div>
        <div 
        className="col-xs-11"
        onClick={() => this.props.markAsRead(this.props)}
        >
          <a href="/#">
            {this.props.message.body}
          </a>
        </div>
      </div>
    )
  }
}

export default Message