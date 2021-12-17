import React, { useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchListings } from './jobsSlice'
import { updateUser } from '../auth/authSlice'
import Icon from 'react-native-vector-icons/FontAwesome'

const JobCard = ({ item }) => {
  console.log(item?.company)
  return (
    <View
      style={{
        // shadowColor: 'black',
        // elevation: 4,
        // shadowRadius: 20,
        // shadowOpacity: 0.3,
        height: 100,
        marginBottom: 8,
        width: '100%',
        flexDirection: 'row',
        border: '1px solid black',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 8,
      }}
    >
      {/* <Text>{item.company}</Text> */}
    </View>
  )
}

const Jobs = () => {
  const dispatch = useDispatch()
  const jobs = useSelector((state) => state.jobs)
  useEffect(() => {
    dispatch(fetchListings())
  }, [])
  return (
    <View style={styles.jobsCont}>
      {/* {!jobs.loading && console.log('Yo', jobs?.jobs)} */}
      <View style={styles.headerCont}>
        <Icon name="bars" size={30} color="black" />
        <Icon name="user-circle" size={30} color="black" />
      </View>
      <Text style={{ fontFamily: 'graphik-regular', fontSize: 30 }}>
        Remote Jobs 👇
      </Text>
      <View style={styles.listCont}>
        <FlatList
          data={!jobs.loading && jobs?.jobs}
          renderItem={JobCard}
          keyExtractor={(item) => item?.id}
        />
      </View>
    </View>
  )
}
export default Jobs

const styles = StyleSheet.create({
  jobsCont: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#FAFAFC',
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
  listCont: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    // height: '100%',
    position: 'relative',
  },
})
