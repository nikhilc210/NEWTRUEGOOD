import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

//Required Imports
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../../constants/theme';

function OrderDetailsView({order_total}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>BILL DETAILS</Text>
      <View style={styles.totalItemViewStyle}>
        <Text style={styles.totalItemTextStyle}>Total</Text>
        <Text style={styles.totalPriceTextStyle}>₹ {order_total}</Text>
      </View>
    </View>
  );
}

export default OrderDetailsView;

const styles = StyleSheet.create({
  container: {paddingTop: hp('3%')},
  titleTextStyle: {
    fontSize: RFValue(14),
    color: '#818596',
    fontFamily: FONTS.primaryFONT,
  },
  singleItemViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },
  titleItemTextStyle: {
    fontSize: RFValue(13),
    color: COLORS.black,
    fontFamily: FONTS.primaryFONT,
  },
  pricingTextStyle: {
    fontSize: RFValue(13),
    color: COLORS.black,
    fontFamily: FONTS.primaryFONT,
    fontWeight: '700',
  },
  totalItemViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    borderTopWidth: 1,
    borderTopColor: COLORS.textGrey,
  },
  totalItemTextStyle: {
    fontSize: RFValue(13),
    color: COLORS.primary,
    fontFamily: FONTS.primaryFONT,
    marginTop: hp('2%'),
    fontWeight: '700',
  },
  totalPriceTextStyle: {
    fontSize: RFValue(13),
    color: COLORS.primary,
    fontFamily: FONTS.primaryFONT,
    fontWeight: '700',
    marginTop: hp('2%'),
  },
});
