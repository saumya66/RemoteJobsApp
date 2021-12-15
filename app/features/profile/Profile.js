import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { auth } from '../../firebase'
import { useSelector, useDispatch } from 'react-redux'

const Profile = () => {
  const user = useSelector((state) => state.auth)

  const handleSignOut = () => {
    auth
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem('userData')
        dispatch(updateUser({ user: null, status: 'loggedOut' }))
      })
      .catch((err) => alert(err))
  }

  return (
    <View style={styles.profileCont}>
      <Text>Email : {JSON.parse(user.user).email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Signout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  profileCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
