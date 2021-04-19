import React from 'react';
import {View, StyleSheet} from 'react-native';
import BackHeader from '../../components/inc/BackHeader';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <BackHeader title="Notifications" />
    </View>
  );
};
export default NotificationScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});
