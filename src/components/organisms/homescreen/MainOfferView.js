import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ModifiedProductItem from "../../atoms/ModifiedProductItem";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMainOfferProducts } from "../../../redux/actions/product";
import { ActivityIndicator } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS, FONTS } from "../../../constants/theme";

const MainOfferView = ({
  productData: { mainOfferProducts, mainOfferLoading },
  getMainOfferProducts,
}) => {
  useEffect(() => {
    getMainOfferProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>Offer Products</Text>
      <View style={styles.productContainer}>
        {mainOfferLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          mainOfferProducts.map((product) => (
            <ModifiedProductItem item={product} key={product._id} />
          ))
        )}
      </View>
    </View>
  );
};

MainOfferView.propTypes = {
  productData: PropTypes.object,
  getMainOfferProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  productData: state.product, //name of prop = alert
});

export default connect(mapStateToProps, { getMainOfferProducts })(
  MainOfferView
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", paddingVertical: hp("2%") },
  productContainer: { width: "100%", flexDirection: "row", flexWrap: "wrap" },
  titleTextStyle: {
    fontSize: RFValue(16),
    fontFamily: FONTS.primaryFONT,
    fontWeight: "700",
    color: COLORS.black,
    margin: hp("1%"),
  },
});
