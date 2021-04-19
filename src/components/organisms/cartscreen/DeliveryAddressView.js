import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLORS} from '../../../constants/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '../../../navigations/RootNavigation';
import ActiveDeliveryItem from '../deliveryScreen/ActiveDeliveryItem';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAddress} from '../../../redux/actions/delivery';

const DeliveryAddressView = ({
  addressData: {activeAddress, loading},
  getAddress,
}) => {
  useEffect(() => {
    getAddress();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerViewStyle}>
          <Text style={[styles.headerText, {fontWeight: 'bold'}]}>
            Delivery Address
          </Text>
          <Text
            onPress={() => navigate('DeliveryNavigator')}
            style={[
              styles.headerText,
              {
                color: COLORS.primary,
                fontSize: RFValue(10),
                fontWeight: 'bold',
                textAlign: 'right',
              },
            ]}>
            Change
          </Text>
        </View>
        <View style={{marginBottom: hp('2%')}}>
          {loading ? (
            <Text>Loading....</Text>
          ) : (
            <ActiveDeliveryItem data={activeAddress ? activeAddress : {}} />
          )}
        </View>
      </View>
    </>
  );
};
DeliveryAddressView.propTypes = {
  addressData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  addressData: state.delivery,
});

export default connect(mapStateToProps, {getAddress})(DeliveryAddressView);

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', marginVertical: hp('1%')},
  innerViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('1%'),
  },
  headerText: {
    paddingHorizontal: hp('1%'),
    flex: 1,
    fontSize: RFValue(12),
  },
  sheetContainerViewStyle: {
    marginHorizontal: hp(3),
    flex: 1,
    alignItems: 'flex-start',
    textAlign: 'center',
  },
});
