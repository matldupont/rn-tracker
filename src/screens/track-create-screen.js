import '../_mock-location'
import * as React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-elements'
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location'
import { Spacer } from '../components/spacer'
import { Map } from '../components/map'

const TrackCreateScreen = () => {
  const [err, setErr] = React.useState(null)
  
  const startWatching = async () => {
    try { 
      const { granted } = await requestPermissionsAsync()
      if (!granted) {
        throw new Error('Location permission not granted')
      }
      await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10
      }, location => {
        console.log('location', location)
      })
    } catch (e) {
      setErr(e)
    }
  }
  
  React.useEffect(() => {
    startWatching()
  },[])

  return (
    <SafeAreaView>
      <Spacer>
        <Text h3>Create a Track</Text>
      </Spacer>
      <Map />
      {err ? <Spacer><Text>Please enable location services</Text></Spacer> : null}
    </SafeAreaView>
  )
}


export { TrackCreateScreen }