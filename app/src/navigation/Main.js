import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator, DrawerItems, SafeAreaView } from 'react-navigation';

import firebase from 'react-native-firebase'

import { TabBarIcon } from '../components';

import {
  HomeScreen,
  ChangeAddressScreen,
  AddAddressScreen,
  ProfileSettingsScreen,
} from '../screens';

import DataManager from '../constants/DataManager';
let commonData = DataManager.getInstance();

const logo = require("../assets/images/logo100x100.png");

import {
  View,
  ScrollView,
  Text,
  Image
} from 'react-native';

import {
  Button,
  Icon,
} from "native-base";

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  AddAddress: {
    screen:AddAddressScreen
  }
},
{
  initialRouteName: "Home"
});

const AddressStack = createStackNavigator({
  ChangeAddress: {
    screen:ChangeAddressScreen
  },
  AddAddress: {
    screen:AddAddressScreen
  }
},
{
  initialRouteName: "ChangeAddress"
});

const NewAddressStack = createStackNavigator({
  AddNewAddress: {
    screen:AddAddressScreen
  }
},
{
  initialRouteName: "AddNewAddress"
});

const ProfileSettingsStack = createStackNavigator({
  ProfileSettings: {
    screen:ProfileSettingsScreen
  }
},
{
  initialRouteName: "ProfileSettings"
});

function clickedItem(e, props, scene) {
  if (scene["route"]["routeName"] == "Addresses"){
    props.navigation.closeDrawer();

    if (!data.user.addresses) {
      //props.navigation.navigate('ChangeAddress');
      props.navigation.navigate('AddNewAddress', {
        isModal: true
      });
    } else {
      props.navigation.navigate('ChangeAddress', {
        isModal: true
      });
    }
  } else if (scene["route"]["routeName"] == "Account"){
    props.navigation.closeDrawer();
    props.navigation.navigate('ChangeAccount', {
      isModal: true
    });
  }
}

function CustomDrawerItem(props){
  var scene = props["data"];
  var label = props["label"];

  if (label == "Home"){
    return <View></View>
  }

  var iconName;

  if (label == "Addresses"){
    iconName = "home";
  } else if (label == "Account"){
    iconName = "person";
  }

  return <Button transparent onPress={props.onPress} style={{width: "100%", height: 32}}>
    <View style={{flex:1, flexDirection:'row'}}>
      <Icon name={iconName} style={{color:"gray", fontSize: 20, width: 16}} />
      <Text style={{marginTop:4}}>{label}</Text>
    </View>
  </Button>
}

var data = commonData.getState();

const signOutUser = async () => {
  alert("sign out!");
  try {
    await firebase.auth().signOut();
  } catch (e) {
    alert(e);
  }
}

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  Account: {
    screen:ProfileSettingsStack
  },
  Addresses: {
    screen:ChangeAddressScreen
  }
},
{
  initialRouteName: "Home",
  contentComponent: props => (
    <View style={{flex:1, height: "100%", flexDirection:"row"}}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{width: "100%", flexDirection:'row', marginBottom: 16}}>
            <Image source={logo} style={{width:32,height:32,marginLeft:8,marginRight:8}} />
            <View>
              <Text style={{marginTop:7}}>{data["user"]["name"]}</Text>
              <Text style={{marginTop:7,color:"gray"}}>Credits: ${data["user"]["credits"]}</Text>
            </View>
          </View>
          <DrawerItems
            {...props}
            getLabel = {(scene) => (
              <CustomDrawerItem label={props.getLabel(scene)} data={scene} onPress={(e) => clickedItem(e, props, scene)} />
            )}
          />
          <Button transparent onPress={signOutUser} style={{width: "100%", position:"absolute", bottom: 16}}>
            <View style={{flex:1, flexDirection:'row'}}>
              <Icon name="log-out" style={{color:"gray", fontSize: 20, width: 16}} />
              <Text style={{marginTop:4}}>Logout</Text>
            </View>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  )
});

const RootHomeStack = createStackNavigator({
  Main: {
    screen: MyDrawerNavigator,
  },
  AddNewAddress: {
    screen:NewAddressStack
  },
  ChangeAddress: {
    screen:AddressStack
  },
  ChangeAccount: {
    screen:ProfileSettingsStack
  }
},
{
  mode: 'modal',
  headerMode: 'none',
});

export default RootHomeStack;
