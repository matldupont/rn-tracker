import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AccountScreen } from './src/screens/account-screen'
import { SigninScreen } from './src/screens/signin-screen'
import { SignupScreen } from './src/screens/signup-screen'
import { TrackCreateScreen } from './src/screens/track-create-screen'
import { TrackDetailScreen } from './src/screens/track-detail-screen'
import { TrackListScreen } from './src/screens/tracklist-screen'
import { ResolveAuthScreen } from './src/screens/resolve-auth-screen'
import { AuthProvider } from './src/context/auth-context'
import { LocationProvider } from './src/context/location-context'
import { TrackProvider } from './src/context/track-context'
import { navigationRef } from './src/root-navigation'

const Stack = createStackNavigator()
const LoginStack = createStackNavigator()
const TracksStack = createStackNavigator()
const MainTab = createBottomTabNavigator()

const isLoggedIn = false

const Login = () => (
  <LoginStack.Navigator >
    <LoginStack.Screen 
      name="ResolveAuth"
      component={ResolveAuthScreen}
      options={{ headerShown: false}}
    />
    <LoginStack.Screen 
      name="Signin"
      component={SigninScreen}
      options={{ headerShown: false}}
    />
    <LoginStack.Screen 
      name="Signup"
      component={SignupScreen}
      options={{ headerShown: false}}
    />
  </LoginStack.Navigator>
)

const Tracks = () => (
  <TracksStack.Navigator
    initialRouteName="TrackList"
  >
    <TracksStack.Screen 
      name="TrackDetail"
      component={TrackDetailScreen}
    /> 
    <TracksStack.Screen 
      name="TrackList"
      component={TrackListScreen}
      options={{ headerShown: false}}
    />
  </TracksStack.Navigator>
)

const Main = () => (
  <MainTab.Navigator
    initialRouteName="Tracks"
  >
    <MainTab.Screen name="Tracks" component={Tracks} />
    <MainTab.Screen 
      name="TrackCreate"
      component={TrackCreateScreen}
      options={{ title: 'Create'}}
    />
    <MainTab.Screen 
      name="Account"
      component={AccountScreen}
    />
  </MainTab.Navigator>
)

export default function App() {
  return (
    <SafeAreaProvider>
      <TrackProvider>
        <LocationProvider>
          <AuthProvider>
            <StatusBar barStyle="dark-content" />
            <NavigationContainer ref={navigationRef} >
              <Stack.Navigator
                initialRouteName="Login"
                headerMode="none"
              >
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Login" component={Login} />
              </Stack.Navigator>
            </NavigationContainer>
          </AuthProvider>
        </LocationProvider>
      </TrackProvider>
    </SafeAreaProvider>
  );
}


