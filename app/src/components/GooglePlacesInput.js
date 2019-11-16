import React from 'react';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import {
  View,
  Input
} from 'react-native';

//customize "react-native-google-places-autocomplete"
/*_onChangeText = (text) => {
  this._request(text);

  this.setState({
    text: text,
    listViewDisplayed: this._isMounted || this.props.autoFocus,
  });

  //added by Ivan
  this.props.onChangeText(text);
}*/

export default class GooglePlacesInput extends React.Component {
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder='Street Address'
        placeholderTextColor='gray'
        minLength={2} // minimum length of text to search
        autoFocus={true}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed='auto' // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={this.props.onSelectedAddress}
        onChangeText={this.props.onChangeText}
        onHasResults={this.props.onHasResults}
        text={this.props.value}

        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyDRjPA64ZirtCzdT2KI5xmIXfyppWVSj-Q',
          language: 'en'
        }}

        styles={{
          textInputContainer: {
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "lightgray",
            width: '100%',
            backgroundColor: '#fff',
            paddingTop: 2,
            height: 47
          },
          textInput: {
            backgroundColor: '#fff',
            marginBottom: 6,
            paddingLeft: 2,
            paddingRight: 2,
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: 17
          },
          description: {
            fontWeight: 'normal'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}

        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance'
        }}

        GooglePlacesDetailsQuery={{
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          fields: 'formatted_address',
        }}

        filterReverseGeocodingByTypes={[]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        predefinedPlaces={[]}

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    );
  }
}
