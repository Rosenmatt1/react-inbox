import React, { Component } from 'react'
// import '../App.css'
import '../index.css'

class Message extends Component {

  render() {

    return (
      <div className={this.props.message.read && this.props.message.selected ? "row message read selected" : this.props.message.selected ? "row message unread selected" : this.props.message.read ? "row message read" : "row message unread"}>
      
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input 
                type="checkbox" 
                onChange={() => this.props.markAsSelected(this.props.message.id)}
                checked={this.props.message.selected ? "checked" : ""}
              />
            </div>
            <div 
            className="col-xs-2"
            >
              <i 
              onClick={() => this.props.markAsStarred(this.props.message.id)}
              className={this.props.message.starred ? "star fa fa-star" : "star fa fa-star-o"}
              >
              </i>
            </div>
          </div>
        </div>
        <div 
        className="col-xs-11"
        onClick={() => this.props.markAsRead(this.props.message.id)}
        >
          <span 
            className={this.props.message.labels.includes("dev") ? "label label-warning" : "hidden"}>dev
          </span>
          <span
            className={this.props.message.labels.includes("gschool") ? "label label-warning" : "hidden"}>gschool
          </span>
          <span
            className={this.props.message.labels.includes("personal") ? "label label-warning" : "hidden"}>personal
          </span>
          {/* {props.message.labels.map(label => <span className="label label-warning>"{label} </span>)} */}
          <a href="/#">
            {this.props.message.subject}
          </a>
        </div>
      </div>
    )
  }
}

export default Message