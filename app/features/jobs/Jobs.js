import React, { useEffect } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchListings } from './jobsSlice'
import Icon from 'react-native-vector-icons/FontAwesome'
import JobCard from '../../components/JobCard'

const Jobs = ({ navigation }) => {
  // const navigation = useNavigation()
  const dispatch = useDispatch()
  const jobs = useSelector((state) => state.jobs)
  // const user = useSelector((state) => state.auth.user)
  // console.log(user)
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
          renderItem={({ item }) => (
            <JobCard item={item} navigation={navigation} />
          )}
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
