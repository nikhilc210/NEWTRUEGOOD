import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  searchProducts,
  resetSearch,
  setQuery,
} from "../../redux/actions/search";

const SearchBarView = ({ searchProducts, resetSearch, setQuery }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (data) => {
    setSearchQuery(data);
    setQuery(data);
    if (searchQuery.length >= 2) {
      onSubmit();
    } else {
      resetSearch();
    }
  };

  const onSubmit = () => {
    searchProducts(searchQuery);
  };

  useEffect(() => {
    let isMounted = false;

    if (!isMounted) {
      resetSearch();
      setSearchQuery("");
    }

    return () => {
      isMounted = true;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for products"
        onChangeText={onChangeSearch}
        autoFocus={true}
        value={searchQuery}
        icon={() => <MaterialIcons name={"search"} size={20} color={"#AAA"} />}
      />
    </View>
  );
};
SearchBarView.propTypes = {
  searchProducts: PropTypes.func.isRequired,
  resetSearch: PropTypes.func,
  setQuery: PropTypes.func,
};

export default connect(null, { searchProducts, resetSearch, setQuery })(
  SearchBarView
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#1CA953",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
