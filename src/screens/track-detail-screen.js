import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { Spacer } from '../components/spacer'

const TrackDetailScreen = () => {
  return (
    <View>
      <Spacer >
        <Text h1>Track Details</Text>
      </Spacer>
    </View>
  )
}

const styles = StyleSheet.create({})

export { TrackDetailScreen }