import * as React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native'
import { useAuth } from '../context/auth-context'
import { AuthForm } from '../components/auth-form'
import { NavLink } from '../components/nav-link'

const SignupScreen = () => {
  const { addListener } = useNavigation()
  const { signup, state, clearErrorMessage } = useAuth()

  React.useEffect(() => {
    const blurListener = addListener('blur', () => {
      clearErrorMessage()
    });

    return blurListener;
  }, [addListener]);

  return (
    <View style={styles.container}>
      <AuthForm 
        heading="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        buttonText="Sign Up"
        onSubmit={signup}
      />
      <NavLink 
        routeName="Signin"
        text="Already have an account? Sign in instead"
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 250
  },
})

export { SignupScreen }