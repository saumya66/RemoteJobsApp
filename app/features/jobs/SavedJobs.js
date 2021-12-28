import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Image,
  Keyboard,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchListings } from './jobsSlice'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import JobCard from '../../components/JobCard'
import _ from 'lodash'
const Jobs = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
  const jobs = useSelector((state) => state.jobs)
  const [savedJobs, setSavedJobs] = React.useState(user.userData.savedJobs)
  React.useEffect(() => {
    console.log('hi')
    setSavedJobs(user.userData.savedJobs)
    console.log(savedJobs)
  }, [user])
  useEffect(() => {
    dispatch(fetchListings())
  }, [])

  return (
    <View style={styles.jobsCont}>
      <View style={styles.listCont}>
        <FlatList
          data={savedJobs}
          renderItem={({ item }) => (
            <JobCard item={item.item} navigation={navigation} saved={true} />
          )}
          keyExtractor={(item) => item.item.id}
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
    // alignItems: 'center',
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
    width: '100%',
    position: 'relative',
  },
  logoCont: {},
})
