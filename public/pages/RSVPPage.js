import React from 'react'
import '../sass/rsvp-page.scss';
import '../actions/rsvpActions'
import * as RSVPActions from '../actions/rsvpActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classnames from 'classnames';



const RSVPPage = React.createClass({
  componentWillMount() {
    this.actions = bindActionCreators(RSVPActions,this.props.dispatch);
    this.actions.fetchGuest(this.props.params.guestId);
  },
  onGuestUpdate(i,e){
    this.actions.updateGuest(i,e.target.value);
  },
  render() {
    let {rsvpStore} = this.props;
    if(rsvpStore.isFetching)
      return (
        <div className="rsvp-page">
          <div className="well">
            <div className="loader"/>
          </div>
        </div>
      )

    return (
      <div className="rsvp-page">
        <div className={classnames('envelope', {'animage' : rsvpStore.saving})}>
          <div className="card">
            <p>
              Dear Dat and Diana,
            </p>
            <p className="header">
              Please save a seat for me and my guest(s):
            </p>
            {
              rsvpStore.guest.guests?
                rsvpStore.guest.guests.map((guest,i)=>
                  <div className="input-row">
                    <div className="col-xs-11">
                      <input
                        onChange={this.onGuestUpdate.bind(null,i)}
                        value={guest}
                        key={i}
                        placeholder="Name"
                        className="form-control guest-input"/>
                    </div>
                    <div className="col-xs-1">
                      <button className="btn btn-default" onClick={this.actions.removeGuest.bind(null,i)}>-</button>
                    </div>
                  </div>
                )
              :
                null
            }

            {
              rsvpStore.guest.numberOfGuests > 0?
                <button className="btn btn-default add-guest" onClick={this.actions.addGuest}>Add Guest</button>
              :
                null
            }
            <div className="info">{`You can invite up to ${rsvpStore.guest.numberOfGuests} guest(s)`}</div>
            <div className="button-container">
              <button
                disabled={rsvpStore.saving}
                className="btn btn-default"
                onClick={this.actions.rsvp.bind(null,this.props.params.guestId,this.props.history)}>
                RSVP
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})



export default connect(state=>{
  return {
    rsvpStore : state.rsvp.toJS()
  }
})(RSVPPage);
