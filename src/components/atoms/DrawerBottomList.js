import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../constants/theme';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {navigate} from '../../navigations/RootNavigation';

const DrawerBottomList = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.singleListViewStyle}
        onPress={() => navigate('AboutUsNavigator')}>
        <Text style={styles.titleTextStyle}>About us</Text>
        <FontAwesome name="angle-right" size={hp('3%')} color={COLORS.black} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.singleListViewStyle}
        onPress={() => navigate('OurProcessNavigator')}>
        <Text style={styles.titleTextStyle}>Our Process</Text>
        <FontAwesome name="angle-right" size={hp('3%')} color={COLORS.black} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.singleListViewStyle}
        onPress={() => navigate('ContactUsNavigator')}>
        <Text style={styles.titleTextStyle}>Contact us</Text>
        <FontAwesome name="angle-right" size={hp('3%')} color={COLORS.black} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.singleListViewStyle}
        onPress={() => navigate('TermsNavigator')}>
        <Text style={styles.titleTextStyle}>Terms & Condition</Text>
        <FontAwesome name="angle-right" size={hp('3%')} color={COLORS.black} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.singleListViewStyle}
        onPress={() => navigate('FAQsNavigator')}>
        <Text style={styles.titleTextStyle}>FAQs</Text>
        <FontAwesome name="angle-right" size={hp('3%')} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
};
export default DrawerBottomList;

const styles = StyleSheet.create({
  container: {flex: 1},
  singleListViewStyle: {
    width: '100%',
    padding: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTextStyle: {
    fontSize: RFValue(13),
    fontFamily: FONTS.primaryFONT,
    color: COLORS.black,
  },
});
