import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacer } from '../components/spacer'

const TrackListScreen = () => {
  const { navigate } = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <Spacer >
        <Text h1>Track List</Text>
      </Spacer>
      <Spacer>
        <Button title="Go to Track Detail" onPress={() => navigate('TrackDetail')} />
      </Spacer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export { TrackListScreen }