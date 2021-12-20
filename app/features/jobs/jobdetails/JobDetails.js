import React from 'react'
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Markdown from 'react-native-markdown-display'
import { useWindowDimensions } from 'react-native'
import RenderHtml from 'react-native-render-html'

const JobDetails = (props) => {
  const { width } = useWindowDimensions()
  const { job } = props.route.params
  const source = {
    html: job.description,
  }
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#FAFAFC',
        padding: 20,
      }}
    >
      <View
        style={{
          height: '35%',
          //   backgroundColor: 'grey',
          alignItems: 'center',
          marginBottom: 15,
        }}
      >
        {job?.company_logo ? (
          <Image
            style={{
              width: 100,
              height: 100,
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
        <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 10 }}>
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
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 15,
          height: '65%',
        }}
      >
        <ScrollView>
          {job.description.charAt(0) === '<' ? (
            <RenderHtml contentWidth={width} source={source} />
          ) : (
            <Markdown>{job.description}</Markdown>
          )}
        </ScrollView>
      </View>
    </View>
  )
}

export default JobDetails

const styles = StyleSheet.create({})
