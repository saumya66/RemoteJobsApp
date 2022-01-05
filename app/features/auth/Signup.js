import React, { useEffect, useState } from 'react'
import {
  Image,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAvoidingView, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import { auth, db } from '../../firebase'
import { updateUser } from './authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const persistUserData = (user) => {
    return new Promise(function (resolve, reject) {
      AsyncStorage.setItem('userData', JSON.stringify(user))
        .then(() => resolve(JSON.stringify(user)))
        .catch((err) => reject('Logged in User data not persisted : ', err))
    })
  }
  const handleSignUp = async () => {
    if (name && email && password) {
      setLoading(true)
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
                    photoUrl: '',
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
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
      alert('Name, Email or Password Empty.')
    }
  }

  return (
    <KeyboardAvoidingView
      //   behavior="padding"
      style={{
        flex: 1,
        padding: 20,
        height: '100%',
        backgroundColor: '#0164FC',
      }}
    >
      <View
        style={{
          height: '50%',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Image
          source={require('../../../assets/loginVector2.png')}
          style={{
            width: '90%',
            height: '90%',
            right: 12,
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: 20,
          }}
        >
          Sign Up
        </Text>
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
        <Pressable
          onPress={handleSignUp}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgba(255,255,255, 0.2)' : '#0164FC',
            },
            styles.button2,
          ]}
        >
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>
              Sign Up
            </Text>
          )}
        </Pressable>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 15, color: 'white' }}>
            {'Already have an account ? '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Signup

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
    height: 45,
  },
  inputContainer: {
    height: '45%',
    width: '100%',
  },
  button2: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: 'white',
    width: '100%',
    height: 45,
  },
})
