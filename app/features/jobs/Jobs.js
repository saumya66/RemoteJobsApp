import React, { useEffect } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Button,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchListings } from './jobsSlice'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Ionicons'
import { getPeriod } from '../../helper'

function JobCard({ item }, navigation) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('JobDetails')}>
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
            ...styles.logoCont,
            width: '25%',
            padding: 8,
          }}
        >
          {item?.company_logo ? (
            <Image
              style={{
                flex: 1,
                width: undefined,
                height: undefined,
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
            ...styles.jobInfo,
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
          <View style={{ flexDirection: 'row' }}>
            {item?.location ? (
              <Icon1
                name="location-outline"
                size={20}
                color={'#8D889D'}
              ></Icon1>
            ) : null}
            <Text style={{ color: '#8D889D' }}>{item?.location}</Text>
          </View>
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
          <TouchableOpacity>
            <Icon name={'bookmark-o'} size={20} color={'#8D889D'}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Jobs = ({ navigation }) => {
  // const navigation = useNavigation()
  const dispatch = useDispatch()
  const jobs = useSelector((state) => state.jobs)
  useEffect(() => {
    dispatch(fetchListings())
  }, [])
  return (
    <View style={styles.jobsCont}>
      <View style={styles.headerCont}>
        <Icon name="bars" size={30} color="black" />
        <Icon name="user-circle" size={30} color="black" />
      </View>

      {/* <Text
        onPress={(e) => navigation.navigate('JobDetails')}
        style={{ fontFamily: 'graphik-regular', fontSize: 30 }}
      >
        Remote Jobs 👇
      </Text> */}

      <View style={styles.listCont}>
        <FlatList
          data={!jobs.loading && jobs?.jobs}
          renderItem={(item) => JobCard(item, navigation)}
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
  logoCont: {},
})
