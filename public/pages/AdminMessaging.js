import React from 'react'
import {Modal,Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GuestActions from '../actions/guestActions';
import '../sass/admin-messaging.scss';



const AdminMessaging = React.createClass({
  getInitialState: function() {
    return {
      value : ''
    };
  },
  componentWillMount: function() {
    this.actions = bindActionCreators(GuestActions,this.props.dispatch);
  },
  onSubjectUpdate(e){
    this.actions.updateEmailSubject(e.target.value);
  },
  onMessageUpdate(e){
    this.actions.updateEmailMessage(e.target.value);
  },
  render() {
    let {guestsStore} = this.props;

    return (
      <div className="admin-messaging">
        <div className="mail-form">
          <div className="email">
            <div type="text" className="email">
              <p>To:</p>
              <input className="form-control" value={'All Guests'} disabled></input>
            </div>
            <div type="text" className="subject">
              <p>Subject:</p>
              <input
                onChange={this.onSubjectUpdate}
                value={guestsStore.emailSubject}
                className="form-control">
              </input>
            </div>
            <div type="text" className="message">
              <p>Message:</p>
              <textarea
                onChange={this.onMessageUpdate}
                value={guestsStore.emailMessage}
                className="form-control" rows="8" cols="50">
              </textarea>
            </div>
          </div>
          <div className="button-container">
            <button className="btn btn-default" onClick={this.actions.sendEmail}>
              Send
            </button>
          </div>
        </div>
      </div>
    )
  }
})


export default connect(state=>{
  return {
    guestsStore : state.guests.toJS()
  }
})(AdminMessaging);
