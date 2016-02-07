import React from 'react'
import {Modal,Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as GuestActions from '../actions/guestActions';
import Griddle from 'griddle-react';
import '../sass/admin-overview.scss';


const AdminOverview = React.createClass({
  componentWillMount: function() {
    this.actions = bindActionCreators(GuestActions,this.props.dispatch);
  },
  onGuestFormUpdate(e){
    this.actions.updateGuestForm(e.target.value);
  },
  render() {
    let {guestsStore} = this.props;
    let rows = guestsStore.guests.map(guest=>{
      return {
        'Name' : guest.name,
        'Email' : guest.email,
        'Phone' : guest.phone,
        'Number of Guests Allowed' : guest.numberOfGuests,
        'Status' : guest,
        'Guests' : guest.guests,
        'id' : guest.id,
      }
    });

    var columnMeta = [
      {
        'columnName': 'Status',
        'locked': false,
        'visible': true,
        'customComponent': (props)=>{
          return (
            <span>
              {
                props.data.hasRSVP?
                  `REPLIED (${props.data.guests.length})`
                :
                  ''
              }
            </span>
          );
        }
      },
      {
        'columnName': 'Guests',
        'locked': false,
        'visible': true,
        'customComponent': (props)=>{
          return (
            <span>
              {
                props.data?
                  props.data.join(', ')
                :
                  null
              }
            </span>
          );
        }
      }
    ];



    return (
      <div className="admin-overview">
        <div className="button-container">
          <button className="btn btn-default" onClick={this.actions.showModal}>
            Import Guests
          </button>
          <button className="btn btn-default">
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
        <div>
          {
            guestsStore.isFetching?
              <div className="loader"/>
            :
              <div>
                <Griddle
                  showFilter={true}
                  resultsPerPage={1000}
                  tableClassName='table table-striped table-hover'
                  results={rows}
                  columns={['Name', 'Email', 'Phone', 'Number of Guests Allowed','Status', 'Guests']}
                  useGriddleStyles={false}
                  columnMetadata={columnMeta}
                />
              </div>
          }
        </div>
      </div>
    )
  }
})


export default connect(state=>{
  return {
    guestsStore : state.guests.toJS()
  }
})(AdminOverview);
