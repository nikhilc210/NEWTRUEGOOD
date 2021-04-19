import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {infobanner} from '../../../constants/images';

export default class Informative extends Component {
  render() {
    return (
      <View>
        <Image
          source={infobanner}
          style={{width: '100%', height: hp('35%'), resizeMode: 'stretch'}}
        />
      </View>
    );
  }
}
