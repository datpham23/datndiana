import React from 'react'
import {Modal,Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GuestActions from '../actions/guestActions';
import '../sass/admin-page.scss';


const AdminPage = React.createClass({
  componentWillMount: function() {
    this.actions = bindActionCreators(GuestActions,this.props.dispatch);
  },
  onGuestFormUpdate(e){
    this.actions.updateGuestForm(e.target.value);
  },
  render() {
    let {guestsStore} = this.props;


    return (
      <div className="admin-page">
        <div className="well">
          <div className="button-container">
            <button className="btn btn-primary" onClick={this.actions.showModal}>
              Import Guests
            </button>
            <button className="btn btn-primary">
              Export To Excel
            </button>
            <Modal show={guestsStore.showModal} onHide={this.actions.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>Import Guests</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="guest-import">
                  <strong>Sample Row</strong>
                  <div>Name, Email, Phone Number, Number of Guests</div>
                  <br/>
                  {
                    guestsStore.saveGuestsError?
                      <Alert bsStyle='danger'>
                        {guestsStore.saveGuestsErrorMessage}
                      </Alert>
                    :
                      null
                  }
                  {
                    guestsStore.isSavingGuests?
                      <div className="loader"/>
                    :
                      <textarea
                        value={guestsStore.guestForm}
                        rows="4"
                        cols="50"
                        onChange={this.onGuestFormUpdate}/>
                  }

                </div>
              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-primary" onClick={this.actions.saveGuests}>
                  Save
                </button>
              </Modal.Footer>
            </Modal>
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
