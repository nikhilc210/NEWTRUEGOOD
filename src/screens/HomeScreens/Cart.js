import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CategoryHeader from "../../components/inc/CategoryHeader";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS } from "../../constants/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import OrderDetailBillingView from "../../components/organisms/cartscreen/OrderDetailBillingView";
import OrderItemsView from "../../components/organisms/cartscreen/OrderItemsView";
//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CheckOutView from "../../components/organisms/cartscreen/CheckOutView";
import BestSellerProducts from "../../components/organisms/BestSellerProducts";
import RecommendedProducts from "../../components/organisms/RecommendedProducts";

const CartScreen = ({ cartData: { items } }) => {
  return (
    <View style={{ flex: 1 }}>
      <CategoryHeader title="Cart" />
      {items.length > 0 ? (
        <>
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <OrderItemsView />
              <View
                style={{
                  backgroundColor: "#fff",
                  marginBottom: hp("2%"),
                  padding: hp("2%"),
                  paddingTop: hp("0%"),
                  marginTop: hp("2%"),
                }}
              >
                <OrderDetailBillingView />
              </View>
              <View
                style={{
                  backgroundColor: "#fff",
                  marginBottom: hp("2%"),
                  padding: hp("2%"),
                  marginTop: hp("2%"),
                }}
              >
                <Text style={styles.titleTextStyle}>Note:</Text>
                <Text>Free Delivery on order above Rs 700/-</Text>
              </View>
            </ScrollView>
          </View>
          <CheckOutView />
        </>
      ) : (
        <ScrollView>
          <BestSellerProducts />
          <RecommendedProducts />
        </ScrollView>
      )}
    </View>
  );
};

CartScreen.propTypes = {
  cartData: PropTypes.object.isRequired,
  sheetRef: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cartData: state.cart, //name of prop = alert
  sheetRef: state.sheet,
});

export default connect(mapStateToProps, null)(CartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp("2%"),
    flexDirection: "column",
    marginBottom: hp("6%"),
  },
  textStyle: {
    fontSize: RFValue(12),
    color: COLORS.black,
    fontFamily: FONTS.primaryFONT,
  },
  buttonTextStyle: {
    fontSize: RFValue(16),
    color: COLORS.primary,
    fontFamily: FONTS.primaryFONT,

    textAlignVertical: "top",
  },
  buttonContainer: {
    padding: hp("2%"),
    alignItems: "center",
    justifyContent: "center",
  },
  titleTextStyle: {
    fontSize: RFValue(14),
    color: COLORS.primary,
  },
});
