import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//Responsive
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

//Themes
import {COLORS, FONTS} from '../../../constants/theme';

//Cart Item imports
import CartProductItem from './CartProductItem';

//Redux Imports
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const OrderItemsView = ({cartData: {items}}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
      }}>
      <Text style={styles.totalTitleTextStyle}>
        Total Items Ordered : {items.length}
      </Text>
      <View style={styles.orderListViewStyle}>
        {items.map((item, index) => (
          <CartProductItem key={index} data={item} />
        ))}
      </View>
    </View>
  );
};
OrderItemsView.propTypes = {
  cartData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cartData: state.cart, //name of prop = alert
});

export default connect(mapStateToProps, null)(OrderItemsView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalTitleTextStyle: {
    fontSize: RFValue(14),
    color: COLORS.black,
    fontFamily: FONTS.primaryFONT,
    marginTop: hp('1%'),
    fontWeight: 'bold',
    margin: hp('2%'),
  },
});
