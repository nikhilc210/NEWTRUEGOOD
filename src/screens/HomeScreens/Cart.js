import React from "react";
import { View, StyleSheet } from "react-native";
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
import EmptyCartScreen from "../../components/organisms/cartscreen/EmptyCartScreen";
import CheckOutView from "../../components/organisms/cartscreen/CheckOutView";

const CartScreen = ({ cartData: { items } }) => {
  return (
    <>
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
            </ScrollView>
          </View>
          <CheckOutView />
        </>
      ) : (
        <EmptyCartScreen />
      )}
    </>
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
  headerText: {
    textAlign: "left",
    paddingHorizontal: hp("1%"),
    flex: 1,
    fontSize: RFValue(12),
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
});
