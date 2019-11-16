import React from 'react';

import {
  Image,
  StyleSheet,
  View
} from 'react-native';

import {
  Button,
  Icon,
  Text
} from "native-base";

import '../constants/Layout';

export default class GooglePlacesInput extends React.Component {
  goToNextScreen(){
    this.props.navigation.push('GetStyled', {
      component: {
        showTabBar:false
      }
    });
  }

  render() {
    return (
      <Button style={{backgroundColor:"#000", height: 120, borderRadius: 0}} onPress={() => this.goToNextScreen()}>
        <Image source={{uri: this.props.photo}} style={styles.coverImage} />
        <Icon name="arrow-forward" style={{marginTop: 10, position:"absolute", right: 0, top: 34}} />
        <View style={{width:"100%", height:120, position:"absolute", left:0, top:0, flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={{textAlign:"center", width:"100%", fontSize:20, fontWeight:"bold" }}>{this.props.title}</Text>
          <Text style={{marginTop:10, textAlign:"center", width:"100%"}}>{this.props.message}</Text>
        </View>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  coverImage: {
    width: window.width,
    height: 120,
    paddingTop: 34,
    flex: 1,
    flexDirection: 'row',
    opacity: .6
  }
});
