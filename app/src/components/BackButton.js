import React from 'react';

import {
  Button,
  Icon
} from "native-base";

import {
  HeaderBackButton
} from 'react-navigation';

export default class BackButton extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    var isBack = this.props.navigation.getParam('isBack', false);
    if (isBack) {
      return <HeaderBackButton onPress={() => this.props.navigation.goBack(null)} />
    } else {
      return <Button transparent onPress={() => this.props.navigation.goBack(null)}><Icon name="close" /></Button>
    }
  }
}
