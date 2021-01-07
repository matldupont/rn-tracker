import '../_mock-location'
import * as React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native'
import { Spacer } from '../components/spacer'
import { Map } from '../components/map'
import { useLocation } from '../hooks/use-location'
import { TrackForm } from '../components/track-form'

const TrackCreateScreen = () => {
  // console.log(useLocation())
  const isFocused = useIsFocused()
  const { state: { locations, currentLocation }, error, startWatching, stopWatching } = useLocation()
  // console.log(currentLocation)

  React.useEffect(() => {
    if(isFocused) {
      startWatching()
    } else {
      stopWatching()
    }
  },[isFocused])

  return (
    <SafeAreaView>
      <Spacer>
        <Text h3>Create a Track</Text>
      </Spacer>
      <Map locations={locations} currentLocation={currentLocation} />
      {error ? <Spacer><Text>Please enable location services</Text></Spacer> : null}
      <TrackForm />
    </SafeAreaView>
  )
}


export { TrackCreateScreen }