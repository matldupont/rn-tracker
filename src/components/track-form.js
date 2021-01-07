import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Spacer } from './spacer'
import { useLocation } from '../hooks/use-location'

const TrackForm = () => {
  const { startRecording, stopRecording, changeName, state: { isRecording, name } } = useLocation()
  
  return (
    <View>
      <Spacer>
        <Input label="Track Name" value={name} onChangeText={changeName} />
      </Spacer>
      <Spacer>
        <Button title={`${isRecording ? 'Stop' : 'Start'} Recording`} onPress={(isRecording ? stopRecording : startRecording)} />
      </Spacer>
    </View>
  )
}

const styles = StyleSheet.create({})

export { TrackForm }