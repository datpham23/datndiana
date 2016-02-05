import Constants      from '../constants/UserConstants';
import * as API       from '../api/api';
import _              from 'lodash';



export const authenticate = ()=>{
  return (dispatch,state)=>{
    dispatch({
      type : Constants.AUTHENTICATING
    })
    API.authenticate().then(res=>{
      dispatch({
        type : Constants.AUTHENTICATED,
        user : res.entity
      });
    }).catch(res=>{
      dispatch({
        type : Constants.AUTHENTICATION_FAILURE
      })
    })

  }
}


export const updateProfile = ()=>{
  return (dispatch,state)=>{
    dispatch({
      type : Constants.UPDATING_PROFILE
    })
    API.updateProfile().then(res=>{
      dispatch({
        type : Constants.UPDATED_PROFILE,
        profile : res.entity
      });
    }).catch(res=>{
      dispatch({
        type : Constants.FAILED_UPDATING_PROFILE
      })
    })

  }
}
