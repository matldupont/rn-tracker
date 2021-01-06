import * as React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Spacer } from './spacer'


const NavLink = ({ text, routeName }) => {
  const { navigate } = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigate(routeName)}>
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  link: {
    fontSize: 16,
    color: 'blue'
  }
})

export { NavLink }