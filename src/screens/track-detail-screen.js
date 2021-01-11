import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { useRoute } from '@react-navigation/native'
import MapView, { Polyline } from 'react-native-maps';
import { Spacer } from '../components/spacer'
import { useTrack } from '../context/track-context'


const TrackDetailScreen = () => {
  const { state: tracks } = useTrack()
  const { params } = useRoute()
  const track = tracks.find(t => t._id === params?._id ) 
  
  if (!track) return null

  const coordinates = track.locations.map(({ coords }) => coords )
  const initialCoords = coordinates[0]
  return (
    <View>
      <Spacer >
        <Text h1>{track.name}</Text>
      </Spacer>
      <MapView
        style={styles.map}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords
        }}
      >
        <Polyline coordinates={coordinates} />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    height: 300
  }
})

export { TrackDetailScreen }