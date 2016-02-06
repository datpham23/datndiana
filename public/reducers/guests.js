import Immutable          from 'immutable';
import Constants          from '../constants/guestConstants';

const initialState = {
  isFetching : false,
  fetchError : false,
  showModal : false,
  isSavingGuests : false,
  saveGuestsError : false,
  saveGuestsErrorMessage : '',
  guestForm : '',
  guests : []
};

export default (state = Immutable.fromJS(initialState), action)=>{
  switch (action.type) {
    case Constants.FETCHING_GUESTS:
      return state.set('isFetching', true).set('fetchError',false);
    case Constants.SHOW_MODAL:
      return state.set('showModal', true);
    case Constants.HIDE_MODAL:
      return state.set('showModal', false);
    case Constants.UPDATE_GUESTS_FROM:
      return state.set('guestForm', action.value);
    case Constants.SAVING_GUESTS:
      return state.merge({
        isSavingGuests : true,
        saveGuestsError : false,
        saveGuestsErrorMessage : ''
      });
    case Constants.SAVED_GUESTS:
      return state.merge({
        isSavingGuests : false,
        saveGuestsError : false,
        saveGuestsErrorMessage : '',
        guestForm : '',
        showModal : false
      });
    case Constants.SAVED_GUESTS_ERROR:
      return state.merge({
        isSavingGuests : false,
        saveGuestsError : true,
        saveGuestsErrorMessage : action.message
      });
    default:
      return state;
  }
}
