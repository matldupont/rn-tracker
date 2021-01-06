import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/auth-context'
import { Spacer } from '../components/spacer'

const AccountScreen = () => {
  const { signout } = useAuth()
  return (
    <SafeAreaView >
      <Spacer >
        <Text h1>Account</Text>
      </Spacer>
      <Spacer>
        <Button title="Log out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})

export { AccountScreen }