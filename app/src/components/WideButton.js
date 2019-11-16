import React from 'react';

import {
  Text,
  Button
} from "native-base";

export default class WideButton extends React.Component {
  render() {
    return (
      <Button onPress={this.props.onPress} disabled={this.props.disabled}>
        <Text style={{width:"100%", textAlign:"center"}}>{this.props.label}</Text>
      </Button>
    );
  }
}
