import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
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
  const [searchActive, setSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [savedJobIds, setSavedJobIds] = React.useState(
    user.userData.savedJobs.length &&
      user.userData.savedJobs.map((job) => job.id)
  )
  React.useEffect(() => {
    setSavedJobIds(
      user.userData.savedJobs.length &&
        user.userData.savedJobs?.map((job) => job.id)
    )
  }, [user])
  useEffect(() => {
    dispatch(fetchListings())
  }, [])

  return (
    <View style={styles.jobsCont}>
      {/* <View style={styles.headerCont}>
        <Icon name="bars" size={30} color="black" />
        <Icon name="user-circle" size={30} color="black" />
      </View> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingTop: 8,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: searchActive ? '85%' : '96%',
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: 'black',
            // backgroundColor: 'grey',
            alignItems: 'center',
            paddingHorizontal: 8,

            borderRadius: 15,
            height: 45,
          }}
        >
          <Icon name="briefcase-search" size={30} color="#8D889D" />
          <TextInput
            style={{
              marginLeft: 8,
              width: '90%',
              fontWeight: 'bold',
              fontSize: 16,
            }}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onFocus={() => setSearchActive(true)}
            placeholder="Search Jobs"
          ></TextInput>
        </View>
        {searchActive && (
          <Text
            // style={{}}
            onPress={(e) => {
              setSearchActive(false)
              setSearchQuery('')
              Keyboard.dismiss()
            }}
          >
            Cancel
          </Text>
        )}
      </View>
      <View style={styles.listCont}>
        {jobs.loading ? (
          <ActivityIndicator size="large" color="#0164FC" />
        ) : (
          <FlatList
            data={
              !jobs.loading &&
              jobs?.jobs.filter((job) =>
                job.position.toLowerCase().includes(searchQuery.toLowerCase())
              )
            }
            renderItem={({ item }) => (
              <JobCard
                item={item}
                navigation={navigation}
                saved={savedJobIds?.length && savedJobIds.includes(item.id)}
              />
            )}
            keyExtractor={(item) => item?.id}
          />
        )}
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
    justifyContent: 'center',
  },
  logoCont: {},
})
