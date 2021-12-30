import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import JobCard from '../../components/JobCard'
import _ from 'lodash'
const Jobs = ({ navigation }) => {
  const dispatch = useDispatch()
  const savedJobs = useSelector((state) => state.auth.userData.savedJobs)

  return (
    <View style={styles.jobsCont}>
      {!savedJobs.length ? (
        <Text style={{ marginTop: 60, color: '#8D889D', textAlign: 'center' }}>
          Go save some awesome opportunities!
        </Text>
      ) : (
        <View style={styles.listCont}>
          <FlatList
            data={savedJobs}
            renderItem={({ item }) => (
              <JobCard item={item} navigation={navigation} saved={true} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
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
