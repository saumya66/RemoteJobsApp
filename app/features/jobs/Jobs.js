import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchListings } from './jobsSlice'
import { updateUser } from '../auth/authSlice'
import Icon from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Jobs = () => {
  const dispatch = useDispatch()
  const jobs = useSelector((state) => state.jobs)
  useEffect(() => {
    dispatch(fetchListings())
  }, [])
  return (
    <View style={styles.jobsCont}>
      {console.log('Yo', jobs?.jobs)}
      <View style={styles.headerCont}>
        <Icon name="bars" size={30} color="black" />
        <Icon name="user-circle" size={30} color="black" />
      </View>
      <Text style={{ fontFamily: 'graphik-regular', fontSize: 30 }}>
        Remote Jobs 👇
      </Text>
    </View>
  )
}
export default Jobs

const styles = StyleSheet.create({
  jobsCont: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'white',
  },
  headerCont: {
    height: '8%',
    alignItems: 'center',
    // backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
