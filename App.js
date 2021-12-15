import { Provider, useDispatch, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { store } from './app/store'
import {} from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Jobs from './app/features/jobs/Jobs'
import Login from './app/features/auth/Login'
import Home from './app/features/Home/Home'
import { auth } from './app/firebase'
import SplashScreen from './app/features/SplashScreen'
const Stack = createNativeStackNavigator()

const App = () => {
  const user = useSelector((state) => state.auth)

  // useEffect(() => {
  //   if (user) {
  //     console.log(auth.currentUser)
  //   }
  // }, [])
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          {user.status === 'loading' ? (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Splash"
              component={SplashScreen}
            />
          ) : user.status === 'loggedIn' ? (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Jobs"
                component={Jobs}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={Home}
              />
            </>
          ) : (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  )
}
export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})
