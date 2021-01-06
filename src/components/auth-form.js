import * as React from 'react'
import { Text, Button, Input } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import { Spacer } from './spacer'

const AuthForm = ({ heading, errorMessage, onSubmit, buttonText}) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <>
      <Spacer>
        <Text h3>{heading}</Text>
      </Spacer>
        <Input
          label="Email" 
          value={email} 
          keyboardType="email-address"
          onChangeText={newEmail => setEmail(newEmail)} 
          autoCapitalize="none"
          autoCorrect={false}
        />
      <Spacer />
      <Input
        secureTextEntry
        label="Password" 
        value={password} 
        onChangeText={newPassword => setPassword(newPassword)} 
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      <Spacer>  
      {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
      ) : null}
        <Button title={buttonText} onPress={() => onSubmit({ email, password })} />
      </Spacer>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 250
  },
  error: {
    color: '#990000',
    marginBottom: 10
  },
  link: {
    fontSize: 16,
    color: 'blue'
  }
})

export { AuthForm }