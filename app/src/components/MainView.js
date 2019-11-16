import React from 'react';

import {
  KeyboardAvoidingView,
  Image,
  View,
  FlatList,
  Alert,
  ImageBackground,
  DatePickerIOS,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  Root
} from "native-base";

import {
  Header
} from 'react-navigation';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'

const ContainerView = Platform.select({
  ios: KeyboardAvoidingView,
  android: View,
})

export default class MainView extends React.Component {
  render() {
    if (this.props.keyboard){
      return (
        <ContainerView
          keyboardVerticalOffset = {Header.HEIGHT}
          behavior="padding"
          style={styles.container}
          onResponderGrant={dismissKeyboard}
          onStartShouldSetResponder={() => true}
        >
          {this.props.children}
        </ContainerView>
      );
    }

    return (
      <Container style={this.props.style}>
        <Content style={styles.content} contentContainerStyle={styles.content}>
          {this.props.children}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
     flex: 1
  },
  container: {
    flex: 1
  }
});
