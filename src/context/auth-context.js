import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDataContext } from './create-data-context'
import trackerAPI from '../api/tracker'
import * as RootNavigation from '../root-navigation'


const authReducer = (state, { type, payload }) => {
  switch(type) {
    case 'add_error':
      return {
        ...state,
        errorMessage: payload
      }
    case 'sign_in':
      return {
        ...state,
        token: payload,
        errorMessage: ''
      }
    case 'sign_out':
      return {
        ...state,
        token: ''
      }
    case 'clear_error':
      return {
        ...state,
        errorMessage: ''
      }
    default:
      return state
  }
}

const signup = dispatch => async ({ email, password }) => {
  try {
    const { data: { token } } = await trackerAPI.post('/signup', {email, password})
    await AsyncStorage.setItem('token', token)
    dispatch({ type: 'sign_in', payload: token })
    RootNavigation.navigate('Main')
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong with signup' })
  }
}


const signin = dispatch => async ({ email, password }) => {
  try {
    const { data: { token } } = await trackerAPI.post('/signin', {email, password})
    await AsyncStorage.setItem('token', token)
    dispatch({ type: 'sign_in', payload: token })
    RootNavigation.navigate('Main')
  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Something went wrong with signin' })
  }
}

const signout = dispatch => async () => {
  dispatch({ type: 'sign_out' })
  await AsyncStorage.removeItem('token')
  RootNavigation.navigate('Signup')
}

const clearErrorMessage = dispatch => () => {
  return dispatch({ type: 'clear_error' })
}

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    dispatch({ type: 'sign_in', payload: token })
    RootNavigation.navigate('Main')
  } else {
    RootNavigation.navigate('Signup')
  }
}

const { 
  Context, 
  Provider: AuthProvider 
} = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: '', errorMessage: '' }
)

const useAuth = () => {
  const context = React.useContext(Context)

  if (!context) {
    throw new Error(`useAuth must be used within an AuthProvider`)
  }

  return context
}

export { AuthProvider, useAuth }

