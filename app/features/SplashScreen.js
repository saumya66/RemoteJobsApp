import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from './auth/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '../firebase'

const SplashScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const user = await AsyncStorage.getItem('userData')
        if (!user) {
          dispatch(
            updateUser({ user: null, userData: {}, status: 'loggedOut' })
          )
        } else {
          const userData = await db
            .collection('users')
            .doc(JSON.parse(user).uid)
            .get()
            .then((docSnapshot) => {
              if (docSnapshot.exists) {
                return docSnapshot.data()
              } else console.log('Nope')
            })
          console.log('Yay found user : ', JSON.parse(user)?.email)
          dispatch(
            updateUser({ user: user, userData: userData, status: 'loggedIn' })
          )
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
