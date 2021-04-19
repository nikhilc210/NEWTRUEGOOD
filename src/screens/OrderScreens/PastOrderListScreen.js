import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

//Required Imports
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LiveOrderListItem from '../../components/organisms/orderscreen/LiveOrderListItem';

import ProductLoader from '../../components/inc/ProductLoader';

//Redux Imports
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPastOrders} from '../../redux/actions/order';
import PastOrderListItem from '../../components/organisms/orderscreen/PastOrderListItem';

const PastOrderListScreen = ({
  getPastOrders,
  orderData: {pastOrders, pastOrderLoading},
}) => {
  useFocusEffect(
    React.useCallback(() => {
      getPastOrders();
    }, []),
  );

  return (
    <View style={styles.container}>
      {pastOrderLoading ? (
        <ProductLoader />
      ) : (
        pastOrders?.map((order) => (
          <PastOrderListItem item={order} key={order._id} />
        ))
      )}
    </View>
  );
};

PastOrderListScreen.propTypes = {
  orderData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  orderData: state.order, //name of prop = alert
});

export default connect(mapStateToProps, {getPastOrders})(PastOrderListScreen);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', padding: hp('2%')},
});
