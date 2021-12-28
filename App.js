import { Provider, useDispatch, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { store } from './app/store'
import {} from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './app/features/auth/Login'
import SplashScreen from './app/features/SplashScreen'
import Tabs from './app/features/navigator/BottomNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import Welcome from './app/features/auth/Welcome'
import Signup from './app/features/auth/Signup'

const Stack = createNativeStackNavigator()
const fetchFonts = () => {
  return Font.loadAsync({
    'graphik-regular': require('./assets/fonts/GraphikRegular.ttf'),
  })
}
const App = () => {
  const user = useSelector((state) => state.auth)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <NavigationContainer>
          {user.status === 'loading' ? (
            <Stack.Navigator>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Splash"
                component={SplashScreen}
              />
            </Stack.Navigator>
          ) : user.status === 'loggedIn' ? (
            <>
              <Tabs />
            </>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Welcome"
                component={Welcome}
              ></Stack.Screen>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Signup"
                component={Signup}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  )
}
export default function AppWrapper() {
  const [dataLoaded, setDataLoaded] = useState(false)
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={console.warn}
      />
    )
  }
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
