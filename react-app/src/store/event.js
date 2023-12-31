export const LOAD_EVENTS = 'events/LOAD_EVENTS'
export const LOAD_SINGLEEVENT = 'events/LOAD_SINGLEEVENT'
export const CREATE_EVENT = 'events/CREATE_EVENT'
export const UPDATE_EVENT = 'events/UPDATE_EVENT'
export const DELETE_EVENT = 'events/DELETE_EVENT'

/* EVENT ACTION CREATORS */

export const loadEvents = (events) => ({
  type: LOAD_EVENTS,
  events
})

export const loadSingleEvent = (eventId) => ({
  type: LOAD_SINGLEEVENT,
  eventId
})

export const createEvent = (event) => ({
  type: CREATE_EVENT,
  event
})

export const updateEvent = (event, eventId) => ({
  type: UPDATE_EVENT,
  payload: {event, eventId}
})

export const deleteEvent = (eventId) => ({
  type: DELETE_EVENT,
  eventId
})

/* THUNKS */

// GET EVENTS
export const fetchAllEventsThunk = () => async dispatch => {
  const response = await fetch('/api/events/')
  if (response.ok) {
    const data = await response.json()
    dispatch(loadEvents(data))
    return data
  }else {
    const errors = await response.json()
    return errors
  }
}

// GET SINGLE EVENT
export const fetchSingleEventThunk = (eventId) => async dispatch => {
  const response = await fetch(`/api/events/${eventId}`)
  if(response.ok){
    const singleEvent = await response.json()
    dispatch(loadSingleEvent(singleEvent))
    return singleEvent
  }else {
    const errors = await response.json()
    return errors
  }
}

// CREATE EVENT
export const createEventThunk = (event) => async dispatch => {
  const response = await fetch('/api/events/new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: event.name,
      date: event.date,
      time: event.time,
      address: event.address,
      city:event.city,
      state: event.state,
      country: event.country,
      zip_code: event.zipCode
    })
  })
  if(response.ok){
    const newEvent = await response.json()
    dispatch(createEvent(newEvent))
    return newEvent
  }else {
    throw await response.json()
  }
}

//EDIT EVENT
export const updateEventThunk = (editedEvent, eventId) => async dispatch => {
  const response = await fetch(`/api/events/${eventId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: editedEvent.name,
      date: editedEvent.date,
      time: editedEvent.time,
      address: editedEvent.address,
      city:editedEvent.city,
      state: editedEvent.state,
      country: editedEvent.country,
      zip_code: editedEvent.zipCode,
    })
  })
  if(response.ok){
    const data = await response.json()
    dispatch(updateEvent(data))
    return data
  }else {
    throw await response.json()
  }
}

//DELETE EVENT
export const deleteEventThunk = eventId => async dispath => {
  const response = await fetch(`/api/events/${eventId}`, {
    method: 'DELETE'
  })
  if(response.ok) {
    dispath(deleteEvent(eventId))
  }else {
    const errors = await response.json()
    return errors
  }
}


//REDUCER

const initialState = {}
const eventReducer = (state = initialState, action) => {
  let newState;
  switch(action.type){
    case LOAD_EVENTS:
      newState = {...state, ...action.events}
      return newState
    case UPDATE_EVENT:
      const updatedEvent = action.payload.event
      newState = {...state, Events: {...state.Events, [updatedEvent.id]: {...updatedEvent}}}
      return newState
    case DELETE_EVENT:
      newState = {...state}
      delete newState[action.eventId]
      return newState
    default:
      return state
  }
}


export default eventReducer
