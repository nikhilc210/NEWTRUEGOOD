import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CategoryHeader from "../../components/inc/CategoryHeader";
//Required Imports
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { FONTS } from "../../constants/theme";
import CategoryTabView from "../../components/organisms/productlistscreen/CategoryTabView";
import ModifiedProductItem from "../../components/atoms/ModifiedProductItem";
import { FlatList } from "react-native-gesture-handler";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProductLoader from "../../components/inc/ProductLoader";

const ProductListScreen = ({ productData: { products, loading } }) => {
  return (
    <View style={styles.container}>
      <CategoryHeader />
      <View style={styles.productListViewStyle}>
        <CategoryTabView />
        {loading ? (
          <ProductLoader />
        ) : (
          <>
            <Text style={styles.itemTextStyle}>
              {products.length} Items Found
            </Text>
            <FlatList
              data={products}
              keyExtractor={(item) => item._id}
              numColumns={2}
              renderItem={({ item }) => {
                return <ModifiedProductItem item={item} />;
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};
ProductListScreen.propTypes = {
  productData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  productData: state.product, //name of prop = alert
});

export default connect(mapStateToProps, null)(ProductListScreen);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  productListViewStyle: { marginBottom: hp("20%") },
  itemTextStyle: {
    fontSize: RFValue(12),
    color: "#818596",
    marginLeft: hp("2%"),
    fontFamily: FONTS.primaryFONT,
    marginBottom: hp("2%"),
    marginTop: hp("2%"),
  },
});
