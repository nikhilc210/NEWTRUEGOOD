import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Image, Text} from 'react-native';

const EmptyCartScreen = (props) => {
  return (
    <>
      <Image
        style={{
          height: hp('40%'),
          width: '100%',
          resizeMode: 'stretch',
        }}
        source={require('../../../assets/images/empty.png')}
      />
    </>
  );
};
export default EmptyCartScreen;
