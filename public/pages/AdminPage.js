import React from 'react'
import {Modal,Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GuestActions from '../actions/guestActions';
import Griddle from 'griddle-react';
import '../sass/admin-page.scss';


const AdminPage = React.createClass({
  componentWillMount: function() {
    this.actions = bindActionCreators(GuestActions,this.props.dispatch);
    this.actions.getGuests();
  },
  onGuestFormUpdate(e){
    this.actions.updateGuestForm(e.target.value);
  },
  render() {
    let {guestsStore} = this.props;

    return (
      <div className="admin-page">
        <div className="well">
          <ul className="nav nav-tabs">
            <li role="presentation"><a href="#/admin/">OverView</a></li>
            <li role="presentation"><a href="#/admin/messaging">Messaging</a></li>
          </ul>
          <div className="admin-children">
            {this.props.children}
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
})(AdminPage);
