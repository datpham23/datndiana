import Immutable          from 'immutable';
import Constants          from '../constants/rsvpConstants';

const initialState = {
  isFetching : false,
  fetchError : false,
  errorMessage : '',
  guest : {},
  saving : false,
  saved : false,
  saveError : false,
  errorMessage : ''
};

export default (state = Immutable.fromJS(initialState), action)=>{
  switch (action.type) {
    case Constants.FETCHING_GUEST:
      return state.merge({
        isFetching : true,
        fetchError : false,
        errorMessage : ''
      });
    case Constants.RECEIVED_GUEST:
      return state.merge({
        isFetching : false,
        fetchError : false,
        errorMessage : '',
        guest : action.guest
      });
    case Constants.FETCH_GUEST_ERROR:
      return state.merge({
        isFetching : false,
        fetchError : true,
        errorMessage : action.errorMessage,
        guest : action.guest
      });
    case Constants.ADD_GUEST:
      return addGuest(state,action);
    case Constants.REMOVE_GUEST:
      return removeGuest(state,action);
    case Constants.UPDATE_GUEST:
      return updateGuest(state,action);
    case Constants.SAVING:
      return state.merge({
        saving : true,
        saveError : false,
        errorMessage : ''
      });
    case Constants.SAVED:
      return state.merge({
        saving : false,
        saveError : false,
        saved : true,
        errorMessage : ''
      });
    case Constants.SAVE_ERROR:
      return state.merge({
        saving : false,
        saveError : false,
        errorMessage : action.message
      });
    default:
      return state;
  }
}


const addGuest = (state,action)=>{
  let newState = state.toJS();
    newState.guest.guests = newState.guest.guests? newState.guest.guests : []

    if(newState.guest.guests.length < newState.guest.numberOfGuests)
      newState.guest.guests.push('');

  return Immutable.fromJS(newState);
}


const removeGuest = (state,action)=>{
  let newState = state.toJS();
  newState.guest.guests.splice(action.index,1);
  return Immutable.fromJS(newState);
}

const updateGuest = (state,action)=>{
  let newState = state.toJS();
  newState.guest.guests[action.index] = action.name;
  return Immutable.fromJS(newState);
}
