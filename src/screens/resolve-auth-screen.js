import * as React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/auth-context'

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useAuth()
  const { addListener } = useNavigation()

  React.useEffect(() => {
    const blurListener = addListener('focus', () => {
      tryLocalSignin()
    });

    return blurListener;
  }, [addListener]);

  React.useEffect(() => {
    tryLocalSignin()
  }, [])

  return null
}

export { ResolveAuthScreen }