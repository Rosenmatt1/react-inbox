import React, { Component } from 'react'
import '../index.css'


class ComposeMessage extends Component {

  render() {

    return (
      <htmlForm className="htmlForm-horizontal well">
        <div className="htmlForm-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="htmlForm-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="htmlForm-control"
              id="subject"
              placeholder="Enter a subject"
              name="subject"
              onChange={this.props.updateSubject}>
            </input>
          </div>
        </div>
        <div className="htmlForm-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="htmlForm-control" onChange={this.props.updateSubject}></textarea>
          </div>
        </div>
        <div className="htmlForm-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input
              type="submit"
              value="Send"
              className="btn btn-primary"
              onClick={(e) => this.props.sendMessage(e)}
            >
            </input>
          </div>
        </div>
      </htmlForm>
    )
  }
}

export default ComposeMessage