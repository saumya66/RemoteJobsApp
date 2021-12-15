import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Jobs from '../jobs/Jobs'
import Home from '../Home/Home'
import * as React from 'react'
import Profile from '../profile/Profile'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="Jobs">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          // tabBarBadge: 3, //Shows notifications
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          headerShown: false,
          tabBarLabel: 'Jobs',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="briefcase"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          // tabBarBadge: 3, //Shows notifications
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
