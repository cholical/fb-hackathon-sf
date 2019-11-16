import React from 'react'

import { Spinner } from 'native-base';

import { AccessToken, LoginManager } from 'react-native-fbsdk';

import {
  Image,
  StyleSheet,
  View,
  Alert,
  Animated,
  Dimensions,
  Keyboard
} from 'react-native';

import {
  Container,
  Content,
  Text,
  Input,
  Icon,
  Item,
  Button
} from "native-base";

import firebase from 'react-native-firebase'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import { Header, NavigationEvents } from 'react-navigation';

export default class SignUpScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: null
  });

  constructor(props) {
    super(props);

    var state = {
      user: {

      }
    }

    this.state = state;
  }

  onChangeText(e, id){
    if (id == "phoneNumber"){
      var current = this.state.user;
      current[id]["formatted"] = e;
      current[id]["number"] = e.replace(/[^0-9]/g, '');
      this.setState({user:current});
    } else {
      var current = this.state.user;
      current[id] = e;
      this.setState({user:current});
    }
  }

  async facebookLogin() {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error('User cancelled request');
      }

      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        throw new Error('Something went wrong obtaining the users access token');
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

      console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
    } catch (e) {
      console.error(e);
    }
  }

  /*
  <View style={{padding:16}}>
    <Text style={{position: "absolute", left: 16, fontSize: 26, fontWeight:"300"}}>
      Welcome to Bundle
    </Text>
  </View>
  <Text style={{fontSize: 26, fontWeight:"300", padding:16}}>
    Welcome to Bundle
  </Text>
  */

  render() {
    return (
      <Container style={this.props.style}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{backgroundColor:"#8ADC31", width:"100%", height:"100px", padding: 4}}>
            <Text style={{textAlign: "center", fontSize: 26, fontWeight:"300"}}>
              Social Justice Warriors ⚔️
            </Text>
          </View>
        </View>
        <View style={{position:"absolute", paddingLeft:32, paddingRight:32, bottom: 48}}>
          <Text style={{textAlign: "center", marginTop: 32, marginBottom:32, fontSize: 26, fontWeight:"300"}}>
            Start making the 🌎 a better place one social good at a time.
          </Text>
          <Button transparent
            style={{
              padding:0,
              margin:0,
            }}
            onPress={() => this.facebookLogin()}
          >
            <View style={{flexDirection: 'row', padding:10, backgroundColor:"#4267B2", borderRadius: 4}}>
              <Icon name="logo-facebook" style={{color: "white", marginRight: 4, fontSize: 36, position:"absolute", top: 7}} />
              <Text
                style={{
                  width: width-64-22,
                  color: "white",
                  height: 28,
                  marginBottom: 6,
                  padding: 5,
                  fontSize: 20,
                  textAlign: "center"
                }}
              >
                Login with Facebook
              </Text>
            </View>
          </Button>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({

});
