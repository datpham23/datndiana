import Immutable          from 'immutable';
import Constants          from '../constants/manualRSVPConstants';

const initialState = {
  name : '',
  email : '',
  phone : '',
  guests : new Array(5),
  isSaving : false,
  vegetarian : false,
};

export default (state = Immutable.fromJS(initialState), action)=>{
  switch (action.type) {
    case Constants.UPDATE_NAME:
      return state.set('name',action.name);
    case Constants.UPDATE_EMAIL:
      return state.set('email',action.email);
    case Constants.UPDATE_PHONE_NUMBER:
      return state.set('phone',action.phoneNumber);
    case Constants.UPDATE_GUEST_NAME:
      return updatGuestName(state,action);
    case Constants.UPDATE_VEGGIE:
      return state.set('vegetarian',!state.get('vegetarian'));
    case Constants.SAVING_RSVP:
      return state.set('isSaving',true);
    case Constants.SAVED_RSVP:
      return Immutable.fromJS(initialState);
    default:
      return state;
  }
}


const updatGuestName = (state,action)=>{
  let newState = state.toJS();
  newState.guests[action.index] = action.name;
  return Immutable.fromJS(newState);
}
