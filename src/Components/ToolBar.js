import React, { Component } from 'react'
import '../index.css'


class ToolBar extends Component {

  render() {

    const disableToolbar =
      this.props.numOfSelected === 0
        ? "disabled"
        : ""

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.unreadTracker()}</span>
            unread messages
          </p>
          <a
            className="btn btn-danger"
            onClick={this.props.composeNewMessage}
            href="/#"
          >
            <i className="fa fa-plus"></i>
          </a>

          <button
            className="btn btn-default"
            onClick={() => this.props.toolbarSelectAll()}
          >
            <i
              className={this.props.numOfSelected === this.props.messages.length
                ? "fa fa-check-square-o"
                : this.props.numOfSelected === 0
                  ? "fa fa-square-o"
                  : "fa fa-minus-square-o"
              }
            >
            </i>
          </button>

          <button
            className="btn btn-default"
            onClick={() => this.props.markAsReadButton()}
            disabled={disableToolbar}
          >
            Mark As Read
          </button>

          <button
            className="btn btn-default"
            onClick={() => this.props.markAsUnreadButton()}
            disabled={disableToolbar}
          >
            Mark As Unread
          </button>

          <select
            onChange={(e) => this.props.addLabel(e)}
            className="form-control label-select"
            disabled={disableToolbar}
          >
            <option >Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select
            className="form-control label-select"
            onChange={(e) => this.props.removeLabel(e)}
            disabled={disableToolbar}
          >
            <option >Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button
            className="btn btn-default"
            onClick={this.props.deleteMessage}
            disabled={disableToolbar}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default ToolBar