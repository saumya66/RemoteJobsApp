import React, { useState } from 'react'
import { useCallback } from 'react'
import {
  Image,
  StyleSheet,
  Linking,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Markdown from 'react-native-markdown-display'
import { useWindowDimensions } from 'react-native'
import RenderHtml from 'react-native-render-html'
import * as WebBrowser from 'expo-web-browser'
const JobDetails = (props) => {
  const { width } = useWindowDimensions()
  const { job } = props.route.params
  const source = {
    html: job.description,
  }
  const [result, setResult] = useState(null)
  const handleOpenLink = async (e) => {
    try {
      let result = await WebBrowser.openBrowserAsync(job.apply_url)
      setResult(result)
    } catch (e) {
      alert(e)
    }
  }
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FAFAFC',
        padding: 20,
      }}
    >
      <View
        style={{
          height: '30%',
          //   backgroundColor: 'grey',
          alignItems: 'center',
          marginBottom: 15,
        }}
      >
        {job?.company_logo ? (
          <Image
            style={{
              width: 80,
              height: 80,
              borderRadius: 10,
              resizeMode: 'contain',
              marginBottom: 20,
            }}
            source={{
              uri: job?.company_logo,
            }}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="building" size={30} color="#8D889D"></Icon>
          </View>
        )}
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          {job?.position}
        </Text>
        <Text style={{ marginBottom: 6 }}>{job?.company}</Text>
        {job?.location ? (
          <View style={{ flexDirection: 'row' }}>
            <Icon1 name="location-outline" size={20}></Icon1>
            <Text style={{}}>{job.location}</Text>
          </View>
        ) : null}
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 15,
          paddingTop: 15,
          paddingBottom: 5,
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 15,
          height: '60%',
        }}
      >
        <ScrollView>
          {job.description.charAt(0) === '<' ? (
            <RenderHtml contentWidth={width} source={source} />
          ) : (
            <Markdown>{job.description}</Markdown>
          )}
        </ScrollView>
        <View style={{ postition: 'absolute', bottom: 0, left: 0 }}>
          <Text style={{ color: '#8D889D' }}>job from remoteok.com</Text>
        </View>
      </View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgba(1, 100, 252, 0.9)'
              : 'rgba(1, 100, 252, 1)',
          },
          styles.button1,
        ]}
        onPress={handleOpenLink}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{'Apply'}</Text>
      </Pressable>
    </View>
  )
}

export default JobDetails

const styles = StyleSheet.create({
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 2,
    borderRadius: 15,
    bottom: 10,
    position: 'absolute',
    width: '100%',
    height: 50,
  },
})
