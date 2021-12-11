import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Listing from './app/features/listings/Listings'
import Login from './app/features/auth/Login'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Listing}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
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
