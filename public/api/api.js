import rest from '../utils/rest';

export const fetchGuests = ()=>{
  return rest({
    method : 'GET',
    path : '/guests'
  })
}

export const saveGuests = (guests)=>{
  return rest({
    method : 'POST',
    path : '/guests',
    entity : guests
  })
}
