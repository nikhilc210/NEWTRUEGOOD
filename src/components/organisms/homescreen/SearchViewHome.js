import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {Searchbar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Redux Imports
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {searchProducts} from '../../../redux/actions/search';
import {navigate} from '../../../navigations/RootNavigation';

const SearchViewHome = () => {
  return (
    <Pressable style={styles.container} onPress={() => navigate('Search')}>
      <Searchbar
        placeholder="Search for products"
        focusable={false}
        editable={false}
        icon={() => <MaterialIcons name={'search'} size={20} color={'#AAA'} />}
      />
    </Pressable>
  );
};
SearchViewHome.propTypes = {
  searchProducts: PropTypes.func.isRequired,
};

export default connect(null, {searchProducts})(SearchViewHome);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#1CA953',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
