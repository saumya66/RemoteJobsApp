import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { auth } from '../../firebase'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { updateUser } from '../auth/authSlice'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/AntDesign'

const MenuItem = ({ handlePress, name, iconName }) => {
  return (
    <TouchableOpacity onPress={(e) => handlePress(e)}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          height: 60,
          alignItems: 'center',
        }}
      >
        <Icon1 name={iconName} size={30} />
        <Text style={{ marginLeft: 30 }}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const handleSignOut = (e) => {
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
      {/* <Text>Email : {JSON.parse(user.user).email}</Text> */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 8,
          width: '100%',
          height: 80,
        }}
      >
        <View
          style={{
            height: '100%',
            width: '22%',
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: '#8D889D',
            position: 'relative',
            backgroundColor: 'transparent',
          }}
        >
          <Icon
            style={{ position: 'absolute' }}
            name="account"
            color="#8D889D"
            size={30}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            width: '78%',
            // backgroundColor: 'black',
          }}
        >
          {console.log(user.userData)}
          <View
            style={{
              width: '80%',
              justifyContent: 'center',
              paddingLeft: 10,
            }}
          >
            <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>
              {user.userData.name}
            </Text>
            <Text style={{}}>{user.userData.email}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          // paddingTop: 8,
          width: '95%',
          marginTop: 12,
          backgroundColor: 'white',
          height: 'auto',
          paddingHorizontal: 12,
        }}
      >
        <MenuItem
          handlePress={() => navigation.navigate('Saves')}
          name={'Saves'}
          iconName={'save'}
        />
        <MenuItem
          handlePress={handleSignOut}
          name={'Logout'}
          iconName={'logout'}
        />
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  profileCont: {
    flex: 1,
    backgroundColor: '#FAFAFC',
    paddingTop: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    // justifyContent: 'center',
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
