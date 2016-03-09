import Constants      from '../constants/rsvpConstants';
import * as API       from '../api/api';

export const fetchGuest = (id)=>{
  return (dispatch, state)=>{
    dispatch({
      type : Constants.FETCH_GUEST
    });

    API.fetchGuest(id).then(res=>{
      dispatch({
        type : Constants.RECEIVED_GUEST,
        guest : res.entity
      });
    }).catch(res=>{
      dispatch({
        type : Constants.FETCH_GUEST_ERROR,
        errorMessage : res.entity
      });
    })
  }
}

export const addGuest = ()=>{
  return {
    type : Constants.ADD_GUEST
  }
}

export const removeGuest = (i)=>{
  return {
    type : Constants.REMOVE_GUEST,
    index : i
  }
}

export const updateGuest = (i,name)=>{
  return {
    type : Constants.UPDATE_GUEST,
    index : i,
    name : name
  }
}

export const rsvp = (id,history)=>{
  return (dispath,state)=>{
    dispath({
      type : Constants.SAVING
    });
    let guest = state().rsvp.toJS().guest;
    API.rsvp(id,guest.guests).then(res=>{
      dispath({
        type : Constants.SAVED
      });
      $.growl({ title: "RSVP'd", message : 'Thanks!'});
      history.pushState(null,'/');
    }).catch(res=>{
      dispath({
        type : Constants.SAVE_ERROR,
        message : res.entity
      });
    })
  }
}
