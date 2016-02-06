import Constants      from '../constants/guestConstants';
import * as API       from '../api/api';
import _              from 'lodash';
import co             from 'co';



export const getGuests = ()=>{
  return (dispatch,state)=>{


  }
}


export const showModal = ()=>{
  return {
    type : Constants.SHOW_MODAL
  }
}

export const hideModal = ()=>{
  return {
    type : Constants.HIDE_MODAL
  }
}

export const updateGuestForm = (value)=>{
  return {
    type : Constants.UPDATE_GUESTS_FROM,
    value : value
  }
}

export const saveGuests = (value)=>{
  return (dispatch,state)=>{
    dispatch({
      type : Constants.SAVING_GUESTS,
      value : value
    });

    let guestsStore = state().guests.toJS();

    try{
      let lines = guestsStore.guestForm.trim().split(/\n/);
      let guests = lines.map(line=>{
        let user = line.split(',');
        if(user.length != 4)
          throw `Invalid Row: ${line}`;

        return {
          name : user[0],
          email : user[1],
          phone : user[2],
          numberOfGuests : user[3]
        }
      });

      API.saveGuests(guests).then(res=>{
        dispatch({
          type : Constants.SAVED_GUESTS,
          message : res.entity
        });
      }).catch(res=>{
        dispatch({
          type : Constants.SAVED_GUESTS_ERROR,
          message : res.entity
        });
      })
    }catch(error){
      console.log(error);
      dispatch({
        type : Constants.SAVED_GUESTS_ERROR,
        message : error
      });
    }
  }
}
