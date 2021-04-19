import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DrawerBottomList from '../atoms/DrawerBottomList';
import DrawerSignInItem from '../atoms/DrawerSignInItem';
import DrawerUpperList from '../atoms/DrawerUpperList';

//Redux Imports
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const CustomDrawer = ({userData: {isAuthenticated}}) => {
  return (
    <View style={styles.container}>
      <DrawerSignInItem />
      <ScrollView showsVerticalScrollIndicator={false}>
        {isAuthenticated && <DrawerUpperList />}

        <DrawerBottomList />
      </ScrollView>
    </View>
  );
};

CustomDrawer.propTypes = {
  userData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userData: state.auth,
});

export default connect(mapStateToProps, null)(CustomDrawer);

const styles = StyleSheet.create({
  container: {flex: 1},
});
