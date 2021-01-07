import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import MapView, { Polyline, Circle } from 'react-native-maps'

const Map = ({ locations, currentLocation }) => {
  if (!currentLocation) return null
  return (
    <MapView 
      style={styles.map} 
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
     
    >
      <Circle 
        center={currentLocation.coords} 
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
      {/* <Polyline strokeColor="black" strokeWidth={2} coordinates={translatedLocations} /> */}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    height: 300
  }
})

export { Map }