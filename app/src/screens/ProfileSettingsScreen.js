import React from 'react';
import {
  Image,
  View,
  TouchableHighlight
} from 'react-native';

import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  Thumbnail,
  Input,
  Root
} from "native-base";

import firebase from 'react-native-firebase';
import SwipeView from 'react-native-swipeview';

import DataManager from '../constants/DataManager';
let commonData = DataManager.getInstance();

import { RadioBullet, PaymentMethods } from '../components';
import { NavigationActions } from 'react-navigation';

const logo = require("../assets/images/capture.png");

function OptionCell(props){
  if (props["value"]){
    return <TouchableHighlight onPress={props.onPress}>
        <View style={{backgroundColor:"#FFF", flex: 1, flexDirection: 'row', padding:10, borderBottomWidth: 0.5, borderBottomColor: '#d6d7da'}}>
        <Text style={{marginRight: 16, padding:6, height: 32, width: 100}}>{props.title}</Text>
        <Text style={{flex: 1, marginRight: 16, padding:6, height: 32}}>{props.value}</Text>
        <Icon name="arrow-forward" style={{alignSelf: 'flex-end', color:"lightgray"}} />
      </View>
    </TouchableHighlight>
  }

  return <TouchableHighlight onPress={props.onPress}><View style={{backgroundColor:"#FFF", flex: 1, flexDirection: 'row', padding:10, borderBottomWidth: 0.5, borderBottomColor: '#d6d7da'}}>
    <Text style={{marginRight:16, padding:6, height:32, width:100}}>{props.title}</Text>
    <Text style={{flex: 1, marginRight:16, padding:6, height:32, color:"gray"}}>{props.placeholderText}</Text>
    <Icon name="arrow-forward" style={{alignSelf: 'flex-end', color:"lightgray"}} />
  </View></TouchableHighlight>
}

export default class ProfileSettingsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Settings',
    headerLeft: <Button transparent onPress={() => navigation.goBack(null)}>
      <Text>Cancel</Text>
    </Button>,
    headerRight:<Button transparent onPress={() => navigation.goBack(null)}>
      <Text>Done</Text>
    </Button>,
  })

  handleDone(){
    //var user = this.state.user;
    //commonData.setState({user: user});

    this.props.navigation.goBack(null);
  }

  onChangeText(e, id){
    if (id == "phoneNumber"){
      var current = this.state.user;
      current[id]["formatted"] = e;
      current[id]["number"] = e.replace(/[^0-9]/g, '');
      this.setState({user:current});
    } else {
      var current = this.state.user;
      current[id] = e;
      this.setState({user:current});
    }
  }

  constructor(props) {
    super(props);
    //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    var state = JSON.parse(JSON.stringify(commonData.getState()));
    var addresses = state.user.addresses;
    for (var i in addresses){
      addresses[i].id = i;
    }
    state.user.addresses = addresses;
    this.state = state;
  }

  render() {
    return (
      <Root>
        <Container>
          <Content>
            <View style={{paddingTop:18, paddingBottom:18, borderBottomWidth: 0.5, borderBottomColor: '#d6d7da'}}>
              <Button transparent style={{height: 74}}>
                <View style={{alignItems: 'center', width: "100%"}}>
                  <Thumbnail square large source={logo} />
                </View>
              </Button>
            </View>
            <View style={{flex: 1, flexDirection: 'row', padding:10, borderBottomWidth: 0.5, borderBottomColor: '#d6d7da'}}>
              <Icon name="person" style={{marginRight:4, width: 32, color:"lightgray", textAlign:"center"}} />
              <Input style={{marginRight: 16, padding:6, height: 32}} value={this.state.user.name} placeholderTextColor="gray" placeholder="Type your full name" onChangeText={(e, id) => this.onChangeText(e, "name")} />
            </View>
            <View style={{flex: 1, flexDirection: 'row', padding:10, borderBottomWidth: 0.5, borderBottomColor: '#d6d7da'}}>
              <Icon name="mail" style={{marginRight:4, width: 32, color:"lightgray", textAlign:"center"}} />
              <Input style={{marginRight: 16, padding:6, height: 32}} value={this.state.user.email} placeholderTextColor="gray" placeholder="Enter your email address" onChangeText={(e, id) => this.onChangeText(e, "email")} />
            </View>
          </Content>
        </Container>
      </Root>
    );
  }
}
