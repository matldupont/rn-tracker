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
 
  const [error, setError] = React.useState(null)
  const { addLocation, state: { locations, currentLocation }} = context
 
  React.useEffect(() => {
    let subscriber
    const startWatching = async () => {
     
      try { 
        const { granted } = await requestPermissionsAsync()
        if (!granted) {
          throw new Error('Location permission not granted')
        }
  
        if (subscriber) {
          subscriber.remove()
        }
        subscriber = await watchPositionAsync({
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        }, location => {
          addLocation(location, isRecording)
        })
      } catch (e) {
        console.error('ERROR', e)
        setError(e)
      }
    }

    if (isWatching) {
      startWatching()
    } else {
      if (subscriber) {
        subscriber.remove()
        subscriber = null
      }
    }

    return () => {
      if (subscriber) {
        subscriber.remove()
      }
    }
  },[isWatching, isRecording])

  return {...context, error}
}

export { useLocation }