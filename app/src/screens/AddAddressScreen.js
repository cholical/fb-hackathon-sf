import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  View,
  Alert
} from 'react-native';

import {
  Button,
  Input,
  Text
} from "native-base";

import {
  BackButton,
  AddressFields,
  WideButton,
  MainView,
  StickyView
} from '../components';

import firebase from 'react-native-firebase';

import DataManager from '../constants/DataManager';
let commonData = DataManager.getInstance();

//import '../constants/Layout';

export default class AddAddressScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'New Address',
    headerLeft: <BackButton navigation={navigation} />,
  })

  handleSaveAddress(e){
    var current = [];
    if (this.state.user["addresses"]){
      current = this.state.user["addresses"];
    }

    for (var i in current){
      current[i].default = false;
    }

    var newAddress = {
      street: this.state.locationSearch,
      city: this.state.city,
      zip: this.state.zip,
      default: true
    }

    if (this.state["aptNumber"]){
      newAddress["aptNumber"] = this.state.aptNumber;
    }

    if (this.state["businessName"]){
      newAddress["businessName"] = this.state.businessName;
    }

    if (this.state["instructions"]){
      newAddress["instructions"] = this.state.instructions;
    }
    newAddress["id"] = current.length;

    current.push(newAddress);

    var user = this.state.user;
    user["addresses"] = current;

    commonData.setState({
      user: user
    });

    var isModal = this.props.navigation.getParam('isModal', false);

    if (isModal) {
      //this.props.navigation.goBack(null);
      this.props.navigation.dismiss();
    } else {
      this.props.navigation.push('ReviewOrder');
    }
  }

  handleOnSelectedAddress(data, details){
    var street = "";
    var zip = "";
    var city = "";
    for (var i in details["address_components"]){
      var chunk = details["address_components"][i];
      if (chunk.types.indexOf("street_number") != -1){
        street=chunk["short_name"];
      } else if (chunk.types.indexOf("route") != -1){
        street+=" "+chunk["short_name"];
      } else if (chunk.types.indexOf("postal_code") != -1){
        zip = chunk["short_name"];
      } else if (chunk.types.indexOf("locality") != -1){
        city = chunk["long_name"];
      } else if (chunk.types.indexOf("administrative_area_level_1") != -1){
        city+=", "+chunk["short_name"];
      }
    }

    var state = {
      selectedAddress:true
    }
    if (street != ""){
      state["locationSearch"] = street;
    }
    if (zip != ""){
      state["zip"] = zip;
    }
    if (city != ""){
      state["city"] = city;
    }

    this.setState(state);
  }

  constructor(props) {
    super(props);

    var data = JSON.parse(JSON.stringify(commonData.getState()));
    this.state = data;
  }

  render() {
    return (
      <MainView keyboard>
        <AddressFields
          data={this.state}
          onSelectedAddress={(data, details = null) => {this.handleOnSelectedAddress(data, details)}}
        />
        <StickyView keyboard>
          <WideButton
            label="Save"
            disabled={!this.state.selectedAddress}
            onPress={(e) => this.handleSaveAddress(e)}
          />
        </StickyView>
      </MainView>
    );
  }
}

const styles = StyleSheet.create({
  
});
