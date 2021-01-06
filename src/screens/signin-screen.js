import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/auth-context'
import { AuthForm } from '../components/auth-form'
import { NavLink } from '../components/nav-link'

const SigninScreen = () => {
  const { addListener } = useNavigation()
  const { signin, state, clearErrorMessage } = useAuth()

  React.useEffect(() => {
    const blurListener = addListener('blur', () => {
      clearErrorMessage()
    });

    return blurListener;
  }, [addListener]);

  return (
    <View style={styles.container}>
      <AuthForm 
        heading="Sign In to Tracker"
        errorMessage={state.errorMessage}
        buttonText="Sign In"
        onSubmit={signin}
      />
      <NavLink 
        routeName="Signup"
        text="Don't have an account? Sign up instead"
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

export { SigninScreen }