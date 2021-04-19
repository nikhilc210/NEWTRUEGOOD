import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

//Responsive Imports
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

//Themes imports
import {COLORS, FONTS} from '../../../constants/theme';
import SingleCategoryItem from '../../atoms/SingleCategoryItem';

//Redux Imports
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  getAllCategories,
  setActiveCategory,
} from '../../../redux/actions/category';
//
import {navigate} from '../../../navigations/RootNavigation';
import {ActivityIndicator} from 'react-native-paper';

const ShopByCategoryView = ({
  getAllCategories,
  setActiveCategory,
  categoryData: {categories, loading},
}) => {
  useEffect(() => {
    getAllCategories();
  }, []);

  const setActiveCategoryId = (categoryId) => {
    setActiveCategory(categoryId);
    navigate('ProductListScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>Shop by category</Text>
      <View style={styles.categoryContainer}>
        {loading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          categories.map((value) => (
            <Pressable
              key={value._id}
              onPress={() => setActiveCategoryId(value._id)}>
              <SingleCategoryItem data={value} />
            </Pressable>
          ))
        )}
      </View>
    </View>
  );
};

ShopByCategoryView.propTypes = {
  getAllCategories: PropTypes.func.isRequired,
  categoryData: PropTypes.object,
  setActiveCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categoryData: state.category, //name of prop = alert
});

export default connect(mapStateToProps, {getAllCategories, setActiveCategory})(
  ShopByCategoryView,
);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f8f9fa', padding: hp('2%')},
  titleTextStyle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.primaryFONT,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: hp('1%'),
  },
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
