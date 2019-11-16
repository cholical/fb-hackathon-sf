import React from 'react';

import {
  Icon
} from "native-base";

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={26}
        style={this.props.focused ? icon_selected : icon_default}
      />
    );
  }
}
