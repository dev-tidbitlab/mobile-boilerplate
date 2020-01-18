import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Animated, Easing, Platform } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import FTRIcon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialIcons'
import UserProfile from '../profile/index'
import HomeScreen from '../home/homeRoute'
import {
    createAppContainer,
} from 'react-navigation';
import {
    createStackNavigator
} from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';

import { createBottomTabNavigator } from 'react-navigation-tabs';
let SlideFromRight = (index, position, width) => {
    const translateX = position.interpolate({
      inputRange: [index - 1, index],
      outputRange: [width, 0],
    })
  
    return { transform: [ { translateX } ] }
  };
  
  const TransitionConfiguration = () => {
    return {
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: (sceneProps) => {
        const { layout, position, scene } = sceneProps;
        const width = layout.initWidth;
        const height = layout.initHeight;
        const { index, route } = scene
        const params = route.params || {}; // <- That's new
        const transition = params.transition || 'default'; // <- That's new
        return {
          default: SlideFromRight(index, position, width),
        }[transition];
      },
    }
  }
const CreateBottomTabNavigator = createBottomTabNavigator({
    HomeView: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-home" color={tintColor} size={28} />
            )
        }
    },
    Organizations: {
        screen: UserProfile,
        navigationOptions: {
            tabBarLabel: 'Organization',
            tabBarIcon: ({ tintColor }) => (
                <FIcon name="sitemap" color={tintColor} size={28} />
            )
        }
    },
    UserProfile: {
        screen: UserProfile,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <FIcon name="user" color={tintColor} size={28} />
            )
        }
    },
}, {
    tabBarOptions: {
        showLabel: true,
        activeTintColor: '#22c1c3',
        inactiveTintColor: '#ABABAB',
        style: {
            backgroundColor: '#FFF',
            shadowOffset: { width: 5, height: 3 },
            shadowColor: 'black',
            shadowOpacity: 0.5,
            elevation: 5,
            borderTopColor: '#f2f2f2',
            borderTopWidth: 1
        }
    }
})
const AuthStack = createStackNavigator(
    {
        HomeScreen: { screen: HomeScreen },
        // AppLoginScreen: { screen: AppLoginScreen },
        // ForgotPassword: { screen: ForgotPassword },
        // AppRegisterScreen: { screen: AppRegisterScreen },
        // AppAuthManiScreen: { screen: AppAuthManiScreen }

    },
    {
        initialRouteName: 'HomeScreen',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        transitionConfig: TransitionConfiguration,
    })
export default createStackNavigator(
    {
        DashboardTabNavigator: AuthStack,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        transitionConfig: TransitionConfiguration,
    }
);
