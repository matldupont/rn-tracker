import * as React from 'react'
import { createDataContext } from './create-data-context';

const locationReducer = (state, { type, payload }) => {
  switch(type) {
    case 'start_recording':
      return {
        ...state,
        isRecording: true
      }
    case 'stop_recording':
      return {
        ...state,
        isRecording: false
      }
    case 'start_watching':
      return {
        ...state,
        isWatching: true
      }
    case 'stop_watching':
      return {
        ...state,
        isWatching: false
      }
    case 'add_current_location':
      return {
        ...state,
        currentLocation: payload,
      }
    case 'add_location':
      return {
        ...state,
        locations: [
          ...state.locations,
          payload
        ]
      }
    case 'change_name':
      return {
        ...state,
        name: payload
      }
    case 'reset':
      return {
        ...state,
        name: '',
        locations: []
      }
    default:
      return state
  }
}

const startWatching = dispatch => () => {
  dispatch({ type: 'start_watching' })
}

const stopWatching = dispatch => () => {
  dispatch({ type: 'stop_watching' })
}

const changeName = dispatch => name => {
  dispatch({ type: 'change_name', payload: name })
}

const startRecording = dispatch => () => {
  dispatch({ type: 'start_recording' })
}

const stopRecording = dispatch => () => {
  dispatch({ type: 'stop_recording' })
}

const addLocation = dispatch => (location, recording) => {
  dispatch({ type: 'add_current_location', payload: location })
  if (recording) {
    dispatch({ type: 'add_location', payload: location })
  }
}

const reset = dispatch => () => dispatch({ type: 'reset' })

const { 
  Context: LocationContext, 
  Provider: LocationProvider 
} = createDataContext(
  locationReducer,
  { startWatching, stopWatching, startRecording, stopRecording, addLocation, changeName, reset },
  { currentLocation: null, locations: [], isWatching: false, isRecording: false, name: '' }
) 

export { LocationProvider, LocationContext }