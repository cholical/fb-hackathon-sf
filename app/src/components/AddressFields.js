import React from 'react';

import { GooglePlacesInput } from './';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import {
  View,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';

import {
  Text
} from "native-base";

export default class AddressFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationSearch: "",
      selectedAddress: false
    };
  }

  handleHasResults(hasResults){
    this.setState({
      hasResults
    });
  }

  handleChangeText(str, name){
    var state = {
      [name]: str
    }

    if (name === "locationSearch" && this.props.data["selectedAddress"]){
      if (this.props.data["locationSearch"] !== str){
        this.props.data["selectedAddress"] = false;
      }
    }

    this.props.data[name] = str;
  }

  render() {
    var locationSearch = "";
    if (this.props.data["locationSearch"]){
      locationSearch = this.props.data["locationSearch"];
    }
    var hasResults = false;
    if (this.state["hasResults"]){
      hasResults = this.state["hasResults"];
    }

    if (!hasResults || locationSearch === "" || this.props.data["selectedAddress"]){
      return <>
        <View style={{padding: 16}}>
          <GooglePlacesInput
            onHasResults={(state) => this.handleHasResults(state)}
            onSelectedAddress={this.props.onSelectedAddress}
            value={this.props.data.locationSearch}
            onChangeText={(e, id) => this.handleChangeText(e, "locationSearch")}
          />
          <View style={{height:208, marginTop: 53}}>
            <TextInput value={this.props.data.aptNumber} placeholderTextColor="gray" placeholder="Apt # (optional)" style={styles.mainInput} onChangeText={(e, id) => this.handleChangeText(e, "aptNumber")} />
            <TextInput value={this.props.data.businessName} placeholderTextColor="gray" placeholder="Business Name (optional)" style={styles.mainInput} onChangeText={(e, id) => this.handleChangeText(e, "businessName")} />
            <View style={{flex: 1, flexDirection: "row"}}>
              <TextInput value={this.props.data.zip} placeholderTextColor="gray" placeholder="Zip Code" style={[styles.mainInput, styles.min50Width]} onChangeText={(e, id) => this.handleChangeText(e, "zip")} />
              <Text style={{paddingTop: 10, paddingLeft: 16, width: "50%"}}>{this.props.data.city}</Text>
            </View>
            <TextInput value={this.props.data.instructions} placeholderTextColor="gray" placeholder="Instructions for delivery (optional)" style={styles.mainInput} onChange={this.props.onChange} onChangeText={(e, id) => this.handleChangeText(e, "instructions")} />
          </View>
        </View>
        <View style={{flex: 1}}></View>
      </>
    } else {
      return <View style={{flex: 1, padding: 16}}>
        <GooglePlacesInput
          onHasResults={(state) => this.handleHasResults(state)}
          onSelectedAddress={this.props.onSelectedAddress}
          value={this.props.data.locationSearch}
          onChangeText={(e, id) => this.handleChangeText(e, "locationSearch")}
        />
      </View>
    }
  }
}

const styles = StyleSheet.create({
  mainInput: {
    borderWidth: 0.5,
    borderColor: "lightgray",
    borderRadius: 4,
    marginBottom: 6,
    paddingBottom: 12,
    paddingTop: 12,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10
  },
  min50Width: {
    width: "50%"
  }
});
