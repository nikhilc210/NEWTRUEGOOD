import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Redux Imports
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {searchProducts} from '../../redux/actions/search';

const SearchBarView = ({searchProducts, query = ''}) => {
  const [searchQuery, setSearchQuery] = useState(query);

  const onChangeSearch = (query) => {
    if (query.length >= 3) {
      onSubmit();
      setSearchQuery(query);
    } else {
      setSearchQuery(query);
    }
  };

  const onSubmit = () => {
    searchProducts(searchQuery);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for products"
        onChangeText={onChangeSearch}
        autoFocus={true}
        value={searchQuery}
        onSubmitEditing={onSubmit}
        icon={() => <MaterialIcons name={'search'} size={20} color={'#AAA'} />}
      />
    </View>
  );
};
SearchBarView.propTypes = {
  searchProducts: PropTypes.func.isRequired,
};

export default connect(null, {searchProducts})(SearchBarView);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#1CA953',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
