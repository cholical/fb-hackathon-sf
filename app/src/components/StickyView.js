import React from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

export default class StickyView extends React.Component {
  render() {
    var style = styles.absoluteBottom;
    if (this.props.keyboard){
      style = styles.relativeBottom;
    }
    return (
      <View style={style}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  relativeBottom: {
    position: "relative",
    bottom: 50,
    marginLeft: 32,
    marginRight: 32
  },
  absoluteBottom: {
    flex:1,
    position: "absolute",
    bottom: 16,
    marginLeft: 32,
    marginRight: 32
  }
});
