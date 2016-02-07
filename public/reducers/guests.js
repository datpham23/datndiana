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
  guests : [],
  emailSubject : '',
  emailMessage : '',
  sendingEmail : false,
  messageUrl : '',
  textMessage : '',
  sendingTextMessage : false
};

export default (state = Immutable.fromJS(initialState), action)=>{
  switch (action.type) {
    case Constants.FETCHING_GUESTS:
      return state.set('isFetching', true).set('fetchError',false);
    case Constants.RECEIVED_GUESTS:
      return state.merge({
        isFetching : false,
        fetchError : false,
        guests : action.guests
      });
    case Constants.FAILED_FETCHING:
      return state.merge({
        isFetching : false,
        fetchError : true
      });
    case Constants.SHOW_MODAL:
      return state.set('showModal', true);
    case Constants.HIDE_MODAL:
      return state.set('showModal', false);
    case Constants.UPDATE_GUESTS_FORM:
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
    case Constants.UPDATE_EMAIL_SUBJECT:
      return state.set('emailSubject',action.subject);
    case Constants.UPDATE_EMAIL_MESSAGE:
      return state.set('emailMessage',action.message);
    case Constants.SENDING_EMAIL:
      return state.set('sendingEmail',true);
    case Constants.SENT_EMAIL:
      return state.merge({
        sendingEmail : false,
        emailSubject : '',
        emailMessage : ''
      });
    case Constants.UPDATE_TEXT_MESSAGE_URL:
      return state.set('messageUrl',action.url);
    case Constants.UPDATE_TEXT_MESSAGE:
      return state.set('textMessage',action.message);
    case Constants.SENDING_TEXT_MESSAGE:
      return state.set('sendingTextMessage',true);
    case Constants.SENT_TEXT_MESSAGE:
      return state.merge({
        sendingTextMessage : false,
        messageUrl : '',
        textMessage : ''
      });
    default:
      return state;
  }
}
