import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../firebase'
import { updateUser } from './auth/authSlice'
import { getUserFromStorage } from '../helper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData')
        if (!userData) {
          dispatch(updateUser({ user: null, status: 'loggedOut' }))
        } else {
          console.log('Yay found user : ', JSON.parse(userData)?.email)
          dispatch(updateUser({ user: userData, status: 'loggedIn' }))
        }
      } catch (err) {
        alert('Error finding user : ', err)
      }
    }
    getUserFromStorage()
  }, [])
  return (
    <View style={styles.splashScreenCont}>
      <Text>Checking Authentication...</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  splashScreenCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'center',
  },
})
