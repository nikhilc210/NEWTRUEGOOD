import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Badge} from 'react-native-elements';
import {COLORS} from '../../constants/theme';

//Redux Imports
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const CartNumber = ({size, color, cartData: {items}}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
      <SimpleLineIcons size={size} color={color} name="bag" />
      <Badge
        badgeStyle={{
          position: 'absolute',
          top: 0,
          backgroundColor: COLORS.primary,
        }}
        value={items.length}
      />
    </View>
  );
};

CartNumber.propTypes = {
  cartData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cartData: state.cart, //name of prop = alert
});

export default connect(mapStateToProps, null)(CartNumber);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
