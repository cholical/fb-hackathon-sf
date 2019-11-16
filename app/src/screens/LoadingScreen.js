import React from 'react'

import { Spinner } from 'native-base';

import {
  Image,
  StyleSheet,
  View
} from 'react-native';

import {
  Container,
  Content
} from "native-base";

import firebase from 'react-native-firebase'

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'SignUpStack')
    })
  }

  render() {
    return (
      <Container style={this.props.style}>
        <Content style={styles.content} contentContainerStyle={styles.container}>
          <Spinner color="black" />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});
