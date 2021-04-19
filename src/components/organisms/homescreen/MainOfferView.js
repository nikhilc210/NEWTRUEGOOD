import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
//Required Imports
import ModifiedProductItem from '../../atoms/ModifiedProductItem';

//Redux Imports
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getMainOfferProducts} from '../../../redux/actions/product';
import {ActivityIndicator} from 'react-native-paper';

const MainOfferView = ({
  productData: {mainOfferProducts, mainOfferLoading},
  getMainOfferProducts,
}) => {
  useEffect(() => {
    getMainOfferProducts();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {mainOfferLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          mainOfferProducts.map((product) => (
            <ModifiedProductItem item={product} key={product._id} />
          ))
        )}
      </View>
    </>
  );
};

MainOfferView.propTypes = {
  productData: PropTypes.object,
  getMainOfferProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  productData: state.product, //name of prop = alert
});

export default connect(mapStateToProps, {getMainOfferProducts})(MainOfferView);

const styles = StyleSheet.create({
  container: {width: '100%', flexDirection: 'row', flexWrap: 'wrap'},
});
