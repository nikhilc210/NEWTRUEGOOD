import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CategoryHeader from "../../components/inc/CategoryHeader";
import SearchBarView from "../../components/inc/SearchBarView";
import { FlatList } from "react-native-gesture-handler";
import ModifiedProductItem from "../../components/atoms/ModifiedProductItem";
//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProductLoader from "../../components/inc/ProductLoader";
import FilterCategoryTabView from "../../components/organisms/productlistscreen/FilterCategoryTabView";
import { ScrollView } from "react-native";
import RecommendedProducts from "../../components/organisms/RecommendedProducts";

const SearchScreen = ({ searchData: { filterProducts, loading, query } }) => {
  return (
    <View style={styles.container}>
      <CategoryHeader title="Search for Products" isSearch={true} />
      <SearchBarView />
      <FilterCategoryTabView />
      {loading ? (
        <ProductLoader />
      ) : filterProducts.length > 0 ? (
        <FlatList
          data={filterProducts}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item }) => {
            return <ModifiedProductItem item={item} />;
          }}
        />
      ) : query.length < 3 ? (
        <ScrollView>
          <RecommendedProducts />
        </ScrollView>
      ) : (
        <Text>No Product found as per search</Text>
      )}
    </View>
  );
};

SearchScreen.propTypes = {
  searchData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  searchData: state.search,
});

export default connect(mapStateToProps, null)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    marginBottom: 200,
  },
});
