import * as React from 'react'
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location'
import { LocationContext } from '../context/location-context'
import { sub } from 'react-native-reanimated'

const useLocation = () => {
  const context = React.useContext(LocationContext)
  if (!context) {
    throw new Error(`useLocation must be used within an LocationProvider`)
  }

  const {state: { isRecording, isWatching } } = context
  const [subscriber, setSubscriber] = React.useState(null)
  const [error, setError] = React.useState(null)
  const { addLocation, state: { locations, currentLocation }} = context

  React.useEffect(() => {
    console.log('LOCATIONS', locations.length)
  },[locations])

  const startWatching = React.useCallback(async () => {
    try { 
      const { granted } = await requestPermissionsAsync()
      if (!granted) {
        throw new Error('Location permission not granted')
      }
      const sub = await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10
      }, location => {
        addLocation(location, isRecording)
      })
      setSubscriber(sub)
    } catch (e) {
      console.error('ERROR', e)
      setError(e)
    }
  },[isRecording])

  
  React.useEffect(() => {
    if (isWatching) {
      console.log('start watching')
      startWatching()
    } else {
      if (subscriber) {
        console.log('stop watching')
        subscriber.remove()
        setSubscriber(null)
      }
    }
  },[isWatching, startWatching])

  return {...context, error}
}

export { useLocation }