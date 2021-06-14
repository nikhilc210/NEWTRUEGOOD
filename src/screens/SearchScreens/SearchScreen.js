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
import RandomProducts from "../../components/organisms/RandomProduct";

const SearchScreen = ({ searchData: { filterProducts, loading, query } }) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <CategoryHeader title="Search for Products" isSearch={true} />
        <SearchBarView />
        <ProductLoader />
      </View>
    );
  }

  if (filterProducts.length > 0) {
    return (
      <View style={styles.container}>
        <CategoryHeader title="Search for Products" isSearch={true} />
        <SearchBarView />
        <FilterCategoryTabView />
        <FlatList
          data={filterProducts}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item }) => {
            return <ModifiedProductItem item={item} />;
          }}
        />
      </View>
    );
  }

  if (query.length < 3) {
    return (
      <View style={styles.container}>
        <CategoryHeader title="Search for Products" isSearch={true} />
        <SearchBarView />
        <ScrollView>
          <RandomProducts />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CategoryHeader title="Search for Products" isSearch={true} />
      <SearchBarView />
      <FilterCategoryTabView />
      <Text>No Product found as per search</Text>
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
