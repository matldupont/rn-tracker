import * as React from 'react'
import { StyleSheet,View,  FlatList, TouchableOpacity } from 'react-native'
import { Text, Button, ListItem } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Spacer } from '../components/spacer'
import { useTrack } from '../context/track-context'

const TrackListScreen = () => {
  const { navigate, addListener } = useNavigation()
  const { fetchTracks, state: tracks } = useTrack()

  React.useEffect(() => {
    const focusListener = addListener('focus', () => {
      fetchTracks()
    });

    return focusListener;
  }, [addListener]);


  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => {
          return (
          <TouchableOpacity onPress={() => navigate('TrackDetail', { _id: item._id })}>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>
                  {item.name}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        )}}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export { TrackListScreen }