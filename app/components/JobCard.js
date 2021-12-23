import * as React from 'react'

import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Ionicons'
import { getPeriod } from '../helper'
import { db } from '../firebase'

const JobCard = ({ item, navigation }) => {
  const user = useSelector((state) => state.auth)
  const saveJob = (e) => {
    // console.log(JSON.parse(user.user).uid)
    let savedJobs = user.userData.savedJobs
    let newSavedJobs = [...savedJobs, { item }]
    db.collection('users')
      .doc(JSON.parse(user.user).uid)
      .update({ savedJobs: newSavedJobs })
      .then(() => console.log('Update Success'))
      .catch((err) => console.log(err))
    // console.log(newSavedJobs)
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('JobDetails', {
          //passing props to the navigating screen in props.route.params
          job: item,
        })
      }
    >
      <View
        style={{
          // shadowColor: 'black',
          // elevation: 4,
          // shadowRadius: 20,
          // shadowOpacity: 0.3,
          height: 'auto',
          marginBottom: 8,
          width: '100%',
          flexDirection: 'row',
          border: '1px solid black',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 8,
        }}
      >
        <View
          style={{
            // ...styles.logoCont,
            width: '25%',
            padding: 8,
          }}
        >
          {item?.company_logo ? (
            <Image
              style={{
                flex: 1,
                // width: undefined,
                // height: undefined,
                borderRadius: 10,
                resizeMode: 'contain',
              }}
              source={{
                uri: item?.company_logo,
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="building" size={30} color="#8D889D"></Icon>
            </View>
          )}
        </View>
        <View
          style={{
            // ...styles.jobInfo,
            width: '60%',
            // backgroundColor: 'grey',
            paddingTop: 8,
            paddingHorizontal: 8,
            paddingBottom: 8,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ marginBottom: 8 }}>
            <Text style={{ opacity: 0.5 }}>{item?.company}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {item?.position}
            </Text>
          </View>
          {item?.location ? (
            <View style={{ flexDirection: 'row' }}>
              <Icon1
                name="location-outline"
                size={20}
                color={'#8D889D'}
              ></Icon1>
              <Text style={{ color: '#8D889D' }}>{item?.location}</Text>
            </View>
          ) : null}
        </View>
        <View
          style={{
            width: '15%',
            padding: 8,
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: '#8D889D' }}>
            {getPeriod(Date.parse(item?.date))}
          </Text>
          <TouchableOpacity onPress={(e) => saveJob()}>
            <Icon name={'bookmark-o'} size={20} color={'#8D889D'}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default JobCard
