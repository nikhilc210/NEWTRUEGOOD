import React from 'react';
import {Image} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {banners} from '../../../constants/images';

const ExoticBanner = () => {
  return (
    <Image
      source={banners[2]}
      style={{
        width: '100%',
        height: hp('20%'),
        resizeMode: 'stretch',
      }}
    />
  );
};

export default ExoticBanner;
