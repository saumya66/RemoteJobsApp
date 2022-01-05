import React, { useState } from 'react'
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { updateUser } from './authSlice'

import * as GoogleAuthentication from 'expo-google-app-auth'
import { ANDROID_STANDALONE_CLIENT_ID } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '../../firebase'
import { useDispatch } from 'react-redux'

const Welcome = ({ navigation }) => {
  const dispatch = useDispatch()
  const persistUserData = (user) => {
    return new Promise(function (resolve, reject) {
      AsyncStorage.setItem('userData', JSON.stringify(user))
        .then(() => {
          console.log(JSON.stringify(user))
          resolve(JSON.stringify(user))
        })
        .catch((err) => {
          console.log('nosave', err)
          reject('Logged in User data not persisted : ', err)
        })
    })
  }
  const signInWithGoogle = async (e) => {
    GoogleAuthentication.logInAsync({
      androidClientId:
        '984400496819-jclkpa9jkrs88eajes82ohinum0kf2fj.apps.googleusercontent.com',
      // androidStandaloneAppClientId: ANDROID_STANDALONE_CLIENT_ID,
      scopes: ['profile', 'email'],
    })
      .then((logInResult) => {
        if (logInResult.type === 'success') {
          const user = logInResult.user
          db.collection('users').doc(user.id).set({
            email: user.email,
            name: user.name,
            savedJobs: [],
            photoUrl: user.photoUrl,
          })
          persistUserData(user)
            .then((userData) => {
              console.log(userData)
              dispatch(
                updateUser({
                  user: userData,
                  userData: {
                    email: user.email,
                    name: user.name,
                    savedJobs: [],
                    photoUrl: user.photoUrl,
                  },
                  status: 'loggedIn',
                })
              )
            })
            .catch((err) => alert("Couldn't save user data : ", err))
        } else {
          alert('Google Sign-In failed : ', error)
        }
      })
      .catch((error) => {
        alert('Google Sign-In failed : ', error)
      })
  }
  return (
    <View
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
          source={require('../../../assets/illustration1.png')}
          style={{
            width: '90%',
            height: '90%',
            right: 12,
          }}
        />
      </View>
      <View style={{ height: '45%', backgroundColor: '' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>
          Welcome,
        </Text>

        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: 16,
          }}
        >
          to RemoteHub !
        </Text>

        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 15,
            marginBottom: 15,
          }}
        >
          {/* The place for people who love to work remote. (This line will be used as the app grows)*/}
          Find remote work.
        </Text>

        <Pressable
          onPress={signInWithGoogle}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgba(255,255,255, 0.8)' : 'white',
            },
            styles.button1,
          ]}
        >
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#0164FC' }}>
            Sign in with Google
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Signup')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgba(255,255,255, 0.2)' : '#0164FC',
            },
            styles.button2,
          ]}
        >
          {/* style={styles.button2}> */}
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>
            Create an account
          </Text>
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
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderRadius: 15,
    width: '100%',
    height: 45,
  },
  button2: {
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
