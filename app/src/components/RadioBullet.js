import React from 'react';

import {
  View
} from 'react-native';

import {
  Icon
} from "native-base";

import Colors from '../constants/Colors';

export default class RadioBullet extends React.Component {
  render() {
    if (this.props["selected"]) {
      return <View style={{padding: 10}}><Icon name="radio-button-on" style={{color: Colors.primaryColor}} /></View>;
    }

    return <View style={{padding: 10}}><Icon name="radio-button-off" /></View>
  }
}
