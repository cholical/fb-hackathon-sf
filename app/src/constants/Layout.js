import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import Colors from './Colors';

export default {
  contentStyle: {
     flex: 1
  },
  paddedViewStyle: {
    marginTop:32,
    marginLeft:32,
    marginRight:32
  },
  textCenterStyle: {
    width:"100%",
    textAlign:"center"
  },
  marginBottomStyle: {
    marginBottom:32
  },
  window: {
    width,
    height
  },
  icon_selected: {
    marginBottom: -3,
    color:Colors.tabIconSelected
  },
  icon_default: {
    marginBottom: -3,
    color:Colors.tabIconDefault
  },
  mainInput: {
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    borderRadius: 4,
    marginBottom: 6,
    paddingLeft: 10,
    paddingRight: 10
  },
  isSmallDevice: width < 375
}
