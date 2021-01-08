import * as React from 'react'
import trackerAPI from '../api/tracker'
import { createDataContext } from './create-data-context';

const trackReducer = (state, { type, payload }) => {
  switch(type) {
    default:
      return state
  }
}

const fetchTracks = dispatch => () => {}
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