import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAvoidingView, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import { auth, db } from '../../firebase'
import { updateUser } from './authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
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

  const handleLogin = () => {
    if (email && password) {
      setLoading(true)

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
          //Saving user data in storage
          persistUserData(user)
            .then((user) => {
              // console.log('Saved User : ', user)
              //Updating Redux State
              dispatch(
                updateUser({
                  user: user,
                  userData: userData,
                  status: 'loggedIn',
                })
              )
            })
            .catch((error) => alert("Couldn't save user data : ", error))
        })
        .catch((err) => {
          alert('Could not Sign In.. : ', err.message)
        })
        .finally(() => setLoading(false))
    } else {
      alert('Email or Password is empty.')
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
          height: '55%',
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
          Sign In
        </Text>
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
          onPress={handleLogin}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgba(255,255,255, 0.2)' : '#0164FC',
            },
            styles.button2,
          ]}
        >
          {/* style={styles.button2}> */}
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>
              Login
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
            {'New to RemoteHub ? '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
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
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={[styles.button]}>
          <Text style={[styles.buttonText]}>Login</Text>
        </TouchableOpacity>
      </View> */}
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 15,
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
