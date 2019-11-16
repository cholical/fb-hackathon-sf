import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  View,
  Alert,
  Dimensions,
  Clipboard
} from 'react-native';

import {
  Button,
  Icon,
  Text,
  Toast
} from "native-base";

import {
  Thread,
  MainView
} from '../components';

import '../constants/Layout';

import firebase from 'react-native-firebase';

import DataManager from '../constants/DataManager';
let commonData = DataManager.getInstance();

import branch from 'react-native-branch'

export default class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: "Home",
    headerLeft: <Button transparent onPress={() => navigation.openDrawer()}>
      <Text><Icon name="menu" /></Text>
    </Button>,
    headerRight: null
  });

  componentDidMount() {
    this.generateShortUrl();
    this.state = commonData.getState();
  }

  constructor(props) {
    super(props);
    var s = commonData.getState()
    s["showToast"] = false;

    var root = this;
    commonData.startListener("tiers", function(data){
      root.setState({tiers: data});
    });

    this.state = s;
  }

  copyToClipboard(){
    Clipboard.setString(this.state.shortUrl);
    Toast.show({
      text: "Link copied!",
      buttonText: "Okay",
      duration: 2000
    });
  }

  async showShareSheet(){
    var description = "Try Bundle! $10 in styling credit 🎉";
    let branchUniversalObject = await branch.createBranchUniversalObject('referral/123', {
      locallyIndex: true,
      title: 'Get Styled!',
      contentDescription: description,
      contentMetadata: {
        customMetadata: {
          uid: this.state.uid
        }
      }
    });

    let linkProperties = { feature: 'referral', channel: 'RNApp' }
    let controlParams = { $desktop_url: 'https://getbundle.co', $ios_url: 'https://getbundle.co/ios' }

    let shareOptions = {
      messageHeader: 'Bundle',
      messageBody: description
    }

    let {channel, completed, error} = await branchUniversalObject.showShareSheet(shareOptions, linkProperties, controlParams)
  }

  async generateShortUrl(){
    var description = this.state.shortUrl+" Try Bundle! $10 in styling credit 🎉";
    let branchUniversalObject = await branch.createBranchUniversalObject('referral/123', {
      locallyIndex: true,
      title: 'Get Styled!',
      contentDescription: description,
      contentMetadata: {
        customMetadata: {
          uid: this.state.uid
        }
      }
    })

    let linkProperties = { feature: 'referral', channel: 'RNApp' }
    let controlParams = {
      $desktop_url: 'http://getbundle.co',
      $ios_url: 'http://getbundle.co/ios'
    }

    let { url } = await branchUniversalObject.generateShortUrl(linkProperties, controlParams)

    this.setState({
      shortUrl: url
    });
  }

  render() {
    return (
      <MainView style={styles.container}>
        {this.state.tiers.map((tier, key) => {
          return (
            <Thread
              key={key}
              navigation={this.props.navigation}
              photo={tier.photoUrl}
              title={tier.title}
              message={tier.message}
            />
          );
        })}
        <View style={{height:"22%"}}></View>
        <View>
          <View style={styles.shareView}>
            <View style={{paddingTop: 13, paddingRight: 8}}>
              <Text>Share with friends</Text>
            </View>
            <Button info onPress={(e) => this.copyToClipboard(e)} style={{marginRight: 8}}>
              <Icon name="link" />
            </Button>
            <Button info onPress={(e) => this.showShareSheet(e)}>
              <Icon name="share" />
            </Button>
          </View>
          <View style={styles.outline}>
            <Text style={{width: "100%", textAlign:"center"}}>
              Give $10, Get $10
            </Text>
            <Text style={{width: "100%", textAlign:"center", fontSize:12, padding: 10}}>
              Share with friends and they'll get $10 of credit. We will apply a $10 credit to your account after their first completed styling.
            </Text>
          </View>
        </View>
      </MainView>
    );
  }
}

const styles = StyleSheet.create({
  outline: {
    borderRadius: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderStyle: "dashed",
    padding: 20,
    margin: 20
  },
  shareView: {
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: 12
  },
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
  }
});
