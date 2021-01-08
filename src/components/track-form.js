import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Spacer } from './spacer'
import { useLocation } from '../hooks/use-location'
import { useSaveTrack } from '../hooks/use-save-track'

const TrackForm = () => {
  const { startRecording, stopRecording, changeName, state: { isRecording, name, locations } } = useLocation()
  const { saveTrack } = useSaveTrack()
  return (
    <View>
      <Spacer>
        <Input label="Track Name" value={name} onChangeText={changeName} />
      </Spacer>
      <Spacer>
        {isRecording ?
          <Button 
            buttonStyle={{backgroundColor: 'red'}}
            title="Stop" 
            onPress={stopRecording} 
          /> :
          <Button
            title="Start Recording"
            onPress={startRecording} 
          />
        }
      </Spacer>

      {
        !isRecording && locations.length > 0 ?
        (
          <Spacer>
            <Button title="Save Recording" onPress={saveTrack} />
          </Spacer>
        ) : 
        null
      }
    </View>
  )
}

const styles = StyleSheet.create({})

export { TrackForm }