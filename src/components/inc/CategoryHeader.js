import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';

import Feather from 'react-native-vector-icons/Feather';
import {goBack, navigate} from '../../navigations/RootNavigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CategoryHeader = ({isSearch = false}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.leftPart}>
            <TouchableOpacity onPress={() => goBack()}>
              <Feather name="arrow-left" color="white" size={20}></Feather>
            </TouchableOpacity>
          </View>
          <View style={styles.innerPart}>
            <Image
              source={require('../../assets/images/logo_white.png')}
              style={{height: 50, width: 80}}
            />
          </View>
          <View style={styles.rightPart}>
            {!isSearch && (
              <MaterialIcons
                name={'search'}
                size={25}
                color="white"
                onPress={() => navigate('Search')}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default CategoryHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#1CA953',
    width: '100%',
  },
  leftPart: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  innerPart: {flex: 5, justifyContent: 'center', alignItems: 'center'},
  rightPart: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  titleTextStyle: {fontSize: RFValue(14), color: 'white', fontWeight: '700'},
});
