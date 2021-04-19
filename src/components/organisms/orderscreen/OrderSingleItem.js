import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../../constants/theme';

import {RFValue} from 'react-native-responsive-fontsize';

function OrderSingleItem({
  // data: {id = 1, name = 'bipul', image = '', quantity = 9},
  data,
}) {
  const {id = 1, name = 'bipul', image = 'https://', quantity = 9} = data;
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1.5,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            elevation: 4,
            marginBottom: RFValue(10),
          }}>
          <Image
            source={{uri: image}}
            style={styles.productImageStyle}
            resizeMode="contain"
          />
        </View>
      </View>
      <View
        style={{
          flex: 3,
        }}>
        <Text style={styles.productNameTextStyle} numberOfLines={1}>
          {name}
        </Text>
        <View
          style={{
            alignContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <View style={styles.addedContainer}>
            <View style={styles.backgroundStyle}>
              <Text style={styles.qtyTextStyle}>{quantity}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default OrderSingleItem;

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.textGrey,
    borderWidth: 2,
    paddingBottom: hp('1%'),
    paddingTop: hp('2%'),
    paddingHorizontal: wp('2%'),
    flexDirection: 'row',
  },
  productImageStyle: {
    width: '100%',
    height: hp('8%'),
  },
  productNameTextStyle: {
    fontSize: RFValue(11),
    marginTop: hp('1%'),
    color: COLORS.black,
    fontWeight: '700',
    marginLeft: hp('2%'),
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
    marginLeft: hp('2%'),
  },
  priceTextStyle: {
    fontSize: RFValue(14),
    marginTop: hp('1%'),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  discountPriceTextStyle: {
    fontSize: RFValue(11),
    marginTop: hp('1%'),
    color: COLORS.textGrey,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    marginLeft: hp('1%'),
  },
  wrapperViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: hp('3%'),
  },
  addContainer: {
    paddingVertical: hp('0.7%'),
    paddingHorizontal: wp('7%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp('0.5%'),
    backgroundColor: COLORS.primary,
    elevation: 1,
  },
  addTextStyle: {
    fontSize: RFValue(10),
    color: COLORS.white,
    fontFamily: FONTS.primaryFONT,
  },
  addedContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp('0.5%'),
    elevation: 1,
    backgroundColor: 'white',
  },
  backgroundStyle: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.3%'),
  },
  qtyTextStyle: {
    color: 'white',
  },
  weightTextStyle: {
    color: COLORS.black,
    fontSize: RFValue(11),
    marginLeft: hp('2%'),
  },
});
