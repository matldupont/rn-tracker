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
  const isFocused = useIsFocused()
  const { state: { locations, currentLocation, isRecording }, error, startWatching, stopWatching } = useLocation()

  React.useEffect(() => {
    if(isFocused) {
      startWatching()
    } else if (!isRecording) {
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