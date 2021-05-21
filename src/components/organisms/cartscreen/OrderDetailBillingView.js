import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

//Required Imports
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS, FONTS } from "../../../constants/theme";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";

function OrderDetailBillingView({ cartData: { items } }) {
  let total = items.reduce(
    (acc, current) => acc + parseFloat(current.price * current.quantity),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>BILL DETAILS</Text>
      <View style={styles.singleItemViewStyle}>
        <Text style={styles.titleItemTextStyle}>Item Total</Text>
        <Text style={styles.pricingTextStyle}>{items.length}</Text>
      </View>
      {total > 700 ? null : (
        <View style={styles.singleItemViewStyle}>
          <Text style={styles.titleItemTextStyle}>Delivery Fee</Text>
          <Text style={styles.pricingTextStyle}>₹ 50</Text>
        </View>
      )}

      <View style={styles.singleItemViewStyle}>
        <Text style={styles.titleItemTextStyle}>Items Amount</Text>
        <Text style={styles.pricingTextStyle}>₹ {total}</Text>
      </View>
      <View style={styles.totalItemViewStyle}>
        <Text style={styles.totalItemTextStyle}>Total</Text>
        <Text style={styles.totalPriceTextStyle}>
          ₹ {total > 700 ? total : total + 50}
        </Text>
      </View>
    </View>
  );
}

OrderDetailBillingView.propTypes = {
  cartData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cartData: state.cart, //name of prop = alert
});

export default connect(mapStateToProps, null)(OrderDetailBillingView);

const styles = StyleSheet.create({
  container: { paddingTop: hp("3%") },
  titleTextStyle: {
    fontSize: RFValue(14),
    color: "#818596",
    fontFamily: FONTS.primaryFONT,
  },
  singleItemViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp("2%"),
  },
  titleItemTextStyle: {
    fontSize: RFValue(13),
    color: COLORS.black,
    fontFamily: FONTS.primaryFONT,
  },
  pricingTextStyle: {
    fontSize: RFValue(13),
    color: COLORS.black,
    fontFamily: FONTS.primaryFONT,
    fontWeight: "700",
  },
  totalItemViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp("2%"),
    borderTopWidth: 1,
    borderTopColor: COLORS.textGrey,
  },
  totalItemTextStyle: {
    fontSize: RFValue(13),
    color: COLORS.primary,
    fontFamily: FONTS.primaryFONT,
    marginTop: hp("2%"),
    fontWeight: "700",
  },
  totalPriceTextStyle: {
    fontSize: RFValue(13),
    color: COLORS.primary,
    fontFamily: FONTS.primaryFONT,
    fontWeight: "700",
    marginTop: hp("2%"),
  },
});
