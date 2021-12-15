import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { auth } from '../../firebase'
import { useSelector, useDispatch } from 'react-redux'
import { fetchListings } from './jobsSlice'
import { updateUser } from '../auth/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Listing = () => {
  const dispatch = useDispatch()
  const jobs = useSelector((state) => state.jobs)
  const user = useSelector((state) => state.auth)
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem('userData')
        dispatch(updateUser({ user: null, status: 'loggedOut' }))
      })
      .catch((err) => alert(err))
  }
  useEffect(() => {
    dispatch(fetchListings())
  }, [])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Email : {JSON.parse(user.user).email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Signout</Text>
      </TouchableOpacity>
    </View>
  )
}
export default Listing

const styles = StyleSheet.create({
  button: {
    width: '70%',
    backgroundColor: '#1A73E8',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
})
