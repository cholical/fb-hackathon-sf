import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from './Main';
import {
  LoadingScreen,
  SignUpScreen
} from '../screens';

import firebase from 'react-native-firebase';

import DataManager from '../constants/DataManager';
let commonData = DataManager.getInstance();

const SignUpStack = createStackNavigator({
  SignUp: {
    screen:SignUpScreen
  }
},
{
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,  // Set the animation duration time as 0 !!
    },
  }),
  /*headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },*/
  initialRouteName: "SignUp"
});

export default createAppContainer(
  createSwitchNavigator({
    LoadingScreen,
    SignUpStack,
    Main
  },
  {
    initialRouteName: 'LoadingScreen'
  })
);
