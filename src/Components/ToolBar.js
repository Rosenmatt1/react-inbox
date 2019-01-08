import React, { Component } from 'react'
// import '../App.css'
import '../index.css'



class ToolBar extends Component {

  render() {

    const ifSelected = this.props.messages.filter(message => message.selected === true).length

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.unreadTracker()}</span>
            unread messages
          </p>

          <a 
          className="btn btn-danger"
          href="/#"
          >
            <i className="fa fa-plus"></i>
          </a>

          <button 
          className="btn btn-default"
            onClick={() => this.props.toolbarSelectAll()}
          >
            <i 
            className={ifSelected === this.props.messages.length  
            ? "fa fa-check-square-o" 
            : ifSelected === 0
            ? "fa fa-square-o"
            : "fa fa-minus-square-o"
            }
            ></i>
          </button>

          <button 
          className="btn btn-default"
          onClick={() => this.props.markAsReadButton()}
          >
            Mark As Read
          </button>

          <button 
          className="btn btn-default"
          onClick={() => this.props.markAsUnreadButton()}
          >
            Mark As Unread
          </button>

          <select 
          onChange={(e) => this.props.addLabel(e)}
          className="form-control label-select"
          >
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button 
          className="btn btn-default"
            onClick={() => this.props.deleteMessage(this.props)}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default ToolBar