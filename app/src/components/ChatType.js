import React from 'react';

import {
  Text,
  View,
  Icon
} from "native-base";

export default class ChatType extends React.Component {
  render() {
    if (this.props.type) {
      if (this.props.type == "money") {
        return (
          <View style={{flex: 1, flexDirection: 'row', marginLeft: 8}}>
            <Text>${this.props.reward}</Text>
            <Text style={{color: "#AAA", fontSize: 13, marginTop:1}}>/post</Text>
          </View>
        );
      }
    }
    return (
      <View style={{flex: 1, flexDirection: 'row', marginLeft: 8}}>
        <Icon name="heart" style={{fontSize: 20, color:"red"}} />
        <Text> + </Text>
        <Icon name="chatboxes" style={{fontSize: 20, color:"blue"}} />
      </View>
    );
  }
}
