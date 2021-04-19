import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PaymentHeader from '../../components/inc/PaymentHeader';

import TopTabNavigator from '../../navigations/top-tab-navigation';

const MyOrderScreen = () => {
  return (
    <View style={styles.container}>
      <PaymentHeader />
      <TopTabNavigator />
    </View>
  );
};
export default MyOrderScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
});
