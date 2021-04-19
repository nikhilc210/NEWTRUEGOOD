import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {thinbanner} from '../../../constants/images';

const ThinBanner = () => {
  return <Image style={styles.container} source={thinbanner} />;
};
export default ThinBanner;

const styles = StyleSheet.create({
  container: {
    height: hp('13%'),
    width: '100%',
    resizeMode: 'stretch',
  },
});
