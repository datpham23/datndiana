import Constants          from '../constants/manualRSVPConstants';
import * as API           from '../api/api';

export const updateName = (name)=>{
  return {
    type : Constants.UPDATE_NAME,
    name : name
  }
}

export const updateEmail = (email)=>{
  return {
    type : Constants.UPDATE_EMAIL,
    email : email
  }
}

export const updatePhoneNumber = (phoneNumber)=>{
  return {
    type : Constants.UPDATE_PHONE_NUMBER,
    phoneNumber : phoneNumber
  }
}

export const updateGuestName = (index,name)=>{
  return {
    type : Constants.UPDATE_GUEST_NAME,
    index : index,
    name : name
  }
}

export const updateVeggie = ()=>{
  return {
    type : Constants.UPDATE_VEGGIE
  }
}


export const rsvp = (history)=>{
  return (dispatch,state)=>{
    dispatch({
      type : Constants.SAVING_RSVP
    });

    let manualRSVP = state().manualRSVP.toJS();

    let guest = {
      name : manualRSVP.name,
      email : manualRSVP.email,
      phone : manualRSVP.phone,
      guests : manualRSVP.guests.filter(guest=>{
        return guest != null
      }),
      vegetarian : manualRSVP.vegetarian
    }

    API.manualRSVP(guest).then(res=>{
      dispatch({
        type : Constants.SAVED_RSVP
      });
      $.growl({ title: "RSVP'd", message : 'Thanks!'});
      history.pushState(null,'/');
    }).catch(res=>{

    });
  }
}
