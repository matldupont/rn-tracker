import * as React from 'react'
import trackerAPI from '../api/tracker'
import { createDataContext } from './create-data-context';

const trackReducer = (state, { type, payload }) => {
  switch(type) {
    case 'fetch_tracks':
      return payload
    default:
      return state
  }
}

const fetchTracks = dispatch => async () => {
  try {
    const { data } = await trackerAPI.get('/tracks')
    dispatch({ type: 'fetch_tracks', payload: data })
  } catch(err) {
    console.error('Error fetching track', err)
  }
}

const createTrack = dispatch => async ({ name, locations }) => {
  try {
    const { data } = await trackerAPI.post('/tracks', {name, locations})

  } catch(err) {
    console.error('Error saving track', err)
  }
}

const {Context, Provider: TrackProvider} = 
  createDataContext(
    trackReducer,
    { fetchTracks, createTrack },
    []
  )

const useTrack = () => {
  const context = React.useContext(Context)

  if (!context) {
    throw new Error(`useTrack must be used within an TrackProvider`)
  }

  return context
}

export { TrackProvider, useTrack }