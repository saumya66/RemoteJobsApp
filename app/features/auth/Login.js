import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAvoidingView, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import { auth, db } from '../../firebase'
import { updateUser } from './authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const persistUserData = (user) => {
    return new Promise(function (resolve, reject) {
      AsyncStorage.setItem('userData', JSON.stringify(user))
        .then(() => resolve(JSON.stringify(user)))
        .catch((err) => reject('Logged in User data not persisted : ', err))
    })
  }
  const handleSignUp = async () => {
    // const userData = {}
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        db.collection('users').doc(user.uid).set({
          email: user.email,
          name: name,
          savedJobs: [],
        })
        persistUserData(user)
          .then((user) =>
            dispatch(
              updateUser({
                user: user,
                userData: {
                  email: user.email,
                  name: name,
                  savedJobs: [],
                },
                status: 'loggedIn',
              })
            )
          )
          .catch((error) => alert(error))
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user
        // console.log('userrr :', user)
        const userData = await db
          .collection('users')
          .doc(user.uid)
          .get()
          .then((docSnapshot) => {
            if (docSnapshot.exists) {
              return docSnapshot.data()
            } else console.log('Nope')
          })

        persistUserData(user)
          .then((user) => {
            // console.log('Saved User : ', user)
            dispatch(
              updateUser({ user: user, userData: userData, status: 'loggedIn' })
            )
          })
          .catch((error) => alert(error))
      })
      .catch((err) => {
        alert(err.message)
      })
  }
  return (
    <KeyboardAvoidingView
      //   behavior="padding"
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={[styles.button]}>
          <Text style={[styles.buttonText]}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={[styles.buttonText, styles.buttonOutlineText]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
    height: 45,
  },
  inputContainer: {
    width: '80%',
  },
  buttonContainer: {
    width: '70%',
  },
  button: {
    backgroundColor: '#1A73E8',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonOutline: {
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonOutlineText: {
    color: '#1A73E8',
  },
})
