import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../../constants/theme';

import {RFValue} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import Toast from 'react-native-simple-toast'


//Redux Imports
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  decQuantity,
  incQuantity,
  removeItem,
} from '../../../redux/actions/cart';

let isFinished = false;

function CartProductItem({
  data: {id, name, price, image, weight, item_stock},
  decQuantity,
  incQuantity,
  removeItem,
  cartData: {items},
  inventoryData: {errors},
}) {
  const qty = items.find((item) => item.id === id)
    ? items.find((item) => item.id === id).quantity
    : 0;

  errors.forEach((element) => {
    if (element == id) {
      isFinished = true;
    } else {
      isFinished = false;
    }
  });

  const increaseCart = () => {
    if (qty >= 99 || qty >= item_stock) {
      Toast.show(
        `Maximum Order Limit for this product is ${item_stock}.You cannot add more!`,
        Toast.SHORT,
      );
    } else {
      incQuantity(id);
    }
  };

  const decreaseCart = () => {
    if (qty === 1) {
      removeItem(id);
    } else {
      decQuantity(id);
    }
  };

  const removeItemFromCart = () => {
    removeItem(id);
  };

  return (
    <View
      style={{
        borderColor: isFinished ? 'red' : COLORS.textGrey,
        borderWidth: 2,
        paddingBottom: hp('1%'),
        paddingTop: hp('2%'),
        paddingHorizontal: wp('2%'),
        flexDirection: 'row',
      }}>
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
        <Pressable
          onPress={() => removeItemFromCart()}
          style={{
            paddingVertical: hp('0.5%'),
            backgroundColor: COLORS.primary,
            flexDirection: 'row',
            borderRadius: hp('0.5%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign name="delete" color="white" />
          <Text style={{color: 'white', marginLeft: hp('1%')}}>Remove</Text>
        </Pressable>
      </View>
      <View
        style={{
          flex: 3,
        }}>
        <Text style={styles.productNameTextStyle} numberOfLines={1}>
          {name}
        </Text>
        <Text style={{marginLeft: hp('2%'), color: 'red'}}>
          {isFinished ? 'Item in not availabe' : null}
        </Text>
        <Text style={styles.weightTextStyle} numberOfLines={1}>
          {weight}
        </Text>
        <View style={styles.wrapperViewStyle}>
          <View style={styles.priceView}>
            <Text style={styles.priceTextStyle}>₹ {price}</Text>
          </View>
        </View>
        <View
          style={{
            alignContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <View style={styles.addedContainer}>
            <Pressable
              style={{paddingHorizontal: wp('1.5%')}}
              onPress={() => {
                decreaseCart();
              }}>
              <AntDesign name="minus" color={COLORS.primary} />
            </Pressable>
            <View style={styles.backgroundStyle}>
              <Text style={styles.qtyTextStyle}>{qty}</Text>
            </View>
            <Pressable
              style={{paddingHorizontal: wp('1.5%')}}
              onPress={() => increaseCart()}>
              <Entypo name="plus" color={COLORS.primary} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

CartProductItem.propTypes = {
  data: PropTypes.object.isRequired,
  incQuantity: PropTypes.func.isRequired,
  decQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cartData: state.cart, //name of prop = alert
  inventoryData: state.inventory,
});

export default connect(mapStateToProps, {incQuantity, decQuantity, removeItem})(
  CartProductItem,
);

const styles = StyleSheet.create({
  container: {
    borderColor: isFinished ? 'red' : COLORS.textGrey,
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
