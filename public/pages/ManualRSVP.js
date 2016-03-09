import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classnames from 'classnames';
import '../sass/manual-rsvp.scss';
import * as RSVPActions from '../actions/manualRSVPActions';



const ManualRSVP = React.createClass({
  componentWillMount() {
    this.actions = bindActionCreators(RSVPActions,this.props.dispatch);
  },
  isValidForm(){
    let {manualRSVP} = this.props;
    return (manualRSVP.name.length > 0 && manualRSVP.email.length >0)
  },
  render() {
    let {manualRSVP} = this.props;

    return (
      <div className="manual-rsvp-page">
        <div className="envelope-container">
          <div className={classnames('envelope', {'animate' : false})}>
            <div className="card">
              <div className='form-group'>
                <label>Name</label>
                <input
                  className='form-control input-sm'
                  name='name'
                  type='text'
                  placeholder='Full Name'
                  value={manualRSVP.name}
                  maxLength='35'
                  onChange={(e)=>{
                    this.actions.updateName(e.target.value)
                  }}
                />
              </div>
              <div className='form-group'>
                <label>Email</label>
                <input
                  className='form-control input-sm'
                  name='name'
                  type='email'
                  placeholder='Email'
                  value={manualRSVP.email}
                  maxLength='35'
                  onChange={(e)=>{
                    this.actions.updateEmail(e.target.value)
                  }}
                />
              </div>
              <div className='form-group'>
                <label>Phone Number</label>
                <input
                  className='form-control input-sm'
                  name='name'
                  type='tel'
                  placeholder='Phone Number'
                  value={manualRSVP.phone}
                  maxLength='35'
                  onChange={(e)=>{
                    this.actions.updatePhoneNumber(e.target.value)
                  }}
                />
              </div>
              <div className='form-group'>
                <label>Guest Names</label>
                <input
                  className='form-control guest-name input-sm'
                  name='guest-name'
                  type='text'
                  placeholder='Guest Name'
                  value={manualRSVP.guests[0]}
                  maxLength='35'
                  onChange={(e)=>{
                    this.actions.updateGuestName(0,e.target.value)
                  }}
                />
                <input
                  className='form-control guest-name input-sm'
                  name='guest-name'
                  type='text'
                  placeholder='Guest Name'
                  value={manualRSVP.guests[1]}
                  maxLength='35'
                  onChange={(e)=>{
                    this.actions.updateGuestName(1,e.target.value)
                  }}
                />
                <input
                  className='form-control guest-name input-sm'
                  name='guest-name'
                  type='text'
                  placeholder='Guest Name'
                  value={manualRSVP.guests[2]}
                  maxLength='35'
                  onChange={(e)=>{
                    this.actions.updateGuestName(2,e.target.value)
                  }}
                />
                <input
                  className='form-control guest-name input-sm'
                  name='guest-name'
                  type='text'
                  placeholder='Guest Name'
                  value={manualRSVP.guests[3]}
                  maxLength='35'
                  onChange={(e)=>{
                    this.actions.updateGuestName(3,e.target.value)
                  }}
                />
                <input
                  className='form-control guest-name input-sm'
                  name='guest-name'
                  type='text'
                  placeholder='Guest Name'
                  value={manualRSVP.guests[4]}
                  maxLength='35'
                  onChange={(e)=>{
                    this.actions.updateGuestName(4,e.target.value)
                  }}
                />
              </div>
              <div className="button-container">
                <button
                  className="btn btn-default rsvp-button"
                  disabled={manualRSVP.isSaving || !this.isValidForm()}
                  onClick={this.actions.rsvp.bind(null,this.props.history)}>
                  RSVP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})



export default connect(state=>{
  return {
    manualRSVP : state.manualRSVP.toJS()
  }
})(ManualRSVP);
