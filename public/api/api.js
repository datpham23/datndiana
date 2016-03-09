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


export const sendEmail = (email)=>{
  return rest({
    method : 'POST',
    path : '/guests/send-email',
    entity : email
  })
}


export const fetchGuest = (id)=>{
  return rest({
    method : 'GET',
    path : `/guests/${id}`
  })
}

/*
  @param array of guest names
*/
export const rsvp = (id,guests)=>{
  return rest({
    method : 'POST',
    path : `/rsvp/link/${id}`,
    entity : guests
  })
}


export const manualRSVP = (guest)=>{
  return rest({
    method : 'POST',
    path : `/rsvp/manual`,
    entity : guest
  })
}



export const sendTextMessage = (message)=>{
  return rest({
    method : 'POST',
    path : '/guests/send-text-message',
    entity : message
  })
}
