import React from 'react';

import {
  Image,
  View,
  FlatList,
  Alert,
  ImageBackground,
  DatePickerIOS,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  Toast
} from "native-base";

import firebase from 'react-native-firebase';

import SwipeView from 'react-native-swipeview';

import DataManager from '../constants/DataManager';
let commonData = DataManager.getInstance();

import '../constants/Layout';

import {
  RadioBullet,
  BackButton,
  MainView,
  StickyView,
  WideButton
} from '../components';

export default class ChangeAddressScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Addresses',
    headerLeft: <BackButton navigation={navigation} />,
    headerRight:<Button transparent onPress={() => {
      navigation.push('AddAddress', {
        isModal: navigation.getParam('isModal', false),
        isBack: true
      })}
    }>
      <Text>Add</Text>
    </Button>,
  })

  handleDone(){
    var user = this.state.user;
    commonData.setState({
      user
    });
    this.props.navigation.goBack(null);
  }

  handleTap = key => {
    var current = this.state.user.addresses;
    for (var i in current){
      if (i == key){
          current[i].default = true;
      } else {
          current[i].default = false;
      }
    }
    var user = this.state.user;
    user["addresses"] = current;
    this.setState({
      user,
      refresh: !this.state.refresh
    });
  }

  deleteItemById = id => {
    if (!this.state.user.addresses[id].default){
      const addresses = this.state.user.addresses.filter(item => item.id !== id);
      var user = this.state.user;

      for (var i in addresses){
        addresses[i].id = parseInt(i);
      }

      user["addresses"] = addresses;

      this.setState({
        user
      });
    } else {
      Toast.show({
        text: "Can't remove default address!",
        buttonText: "Okay",
        type: "warning",
        duration: 2000
      });
    }
  }

  constructor(props) {
    super(props);
    //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    var state = JSON.parse(JSON.stringify(commonData.getState()));
    var addresses = state.user.addresses;
    for (var i in addresses){
        addresses[i].id = parseInt(i);
    }

    state.user.addresses = addresses;

    this.state = state;
  }

  render() {
    return (
      <MainView>
        <FlatList
          extraData={this.state.refresh}
          data={this.state.user.addresses}
          keyExtractor={data => data.id.toString()}
          renderItem={({item}) => (
            <SwipeView
              renderVisibleContent={() =>
                <TouchableHighlight onPress={() => this.handleTap(item.id)}>
                  <View style={styles.cell}>
                    <RadioBullet selected={item.default} />
                    <View>
                      <Text>
                        {item["aptNumber"] ? item.street+', '+item.aptNumber : item.street}
                      </Text>
                      <Text>
                        {item.city}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              }
              renderRightView={() =>
                <Button full danger
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                >
                  <Icon active name="trash" />
                </Button>
              }
              onSwipedLeft={() => this.deleteItemById(item.id)}
              leftOpenValue = {this.leftOpenValue}
              rightOpenValue = {this.rightOpenValue}
              swipeDuration = {300}
              swipeToOpenPercent = {40}
            />
          )}
        />
        <StickyView>
          <WideButton onPress={(e) => this.handleDone(e)} label="Done" />
        </StickyView>
      </MainView>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    backgroundColor: "#fff",
    height: 74,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    width: "100%"
  }
});
