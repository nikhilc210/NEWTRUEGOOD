import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {navigate} from '../navigations/RootNavigation';

const FailurePage = (props) => (
  <View style={styles.container}>
    <Text>Sorry Some Error Occured!!!</Text>
    <Button onPress={() => navigate('Home')}>Go Back</Button>
  </View>
);
export default FailurePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
