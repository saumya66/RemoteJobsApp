import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Jobs from '../jobs/Jobs'
import Home from '../Home/Home'
import * as React from 'react'
import Profile from '../profile/Profile'
import { BottomTabBar } from '@react-navigation/bottom-tabs'
import JobDetails from '../jobs/jobdetails/JobDetails'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Jobs"
      //This tabBar prop with all the things in it helps you to show whatever no. of tabs you want in the
      //bar or the user but let's you to navigate to other mentioned tabs too even if you dont' show then in the bar
      // tabBar={(props) => (
      //   <BottomTabBar
      //     {...props}
      //     state={{ ...props.state, routes: props.state.routes.slice(0, 3) }}
      //   ></BottomTabBar>
      // )}
    >
      {/* <Tab.Screen
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
      /> */}
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
      <Tab.Screen
        name="JobDetails"
        component={JobDetails}
        options={{
          headerShown: false,
          tabBarLabel: 'JobDetails',

          tabBarButton: () => null, //New approach just adding this and the below prop hides the tab but let's you navigate to it
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
