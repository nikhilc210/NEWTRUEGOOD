import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Button } from "react-native-paper";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { COLORS } from "../../../constants/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { navigate } from "../../../navigations/RootNavigation";
import { getMinimumPrice } from "../../../../api";

import Toast from "react-native-simple-toast";

const ProceedToPayView = ({
  cartData: { items },
  userData: { isAuthenticated },
  sheetData: { bottomRef },
  deliveryDate: { date },
  deliveryData: { activeAddress },
  mode,
}) => {
  const [minimum, setMinimum] = useState(0);

  useEffect(() => {
    const getMinimumCart = async () => {
      let response = await getMinimumPrice();
      setMinimum(response);
    };
    getMinimumCart();
  }, []);

  let total = items.reduce(
    (acc, current) => acc + parseFloat(current.price * current.quantity),
    0
  );
  const CheckandSend = () => {
    if (isAuthenticated) {
      //MORE LOGIC TO BE IMPLEMENTED
      if (date === "Select a Delivery Slot") {
        Toast.show("Please select the delivery time !", Toast.SHORT);
      } else {
        if (activeAddress === null) {
          Toast.show("Please select the delivery address !", Toast.SHORT);
        } else {
          if (total >= minimum) {
            if (mode === "online") {
              navigate("PaymentNavigator", {
                TotalAmount: total > 700 ? total : total + 50,
              });
            } else {
              navigate("SuccessPage", {
                payment_mode: "cod",
                transaction_details: {},
              });
            }
          } else {
            Toast.show(
              `Minimum cart value is ${minimum}. Add more items !`,
              Toast.SHORT
            );
          }
        }
      }
    } else {
      Toast.show("Please Login to checkout !", Toast.SHORT);
      bottomRef.current.open();
    }
  };
  return (
    <View style={styles.checkOutPage}>
      <View style={styles.viewStyle}>
        <Text style={{ fontSize: RFValue(14), fontWeight: "bold" }}>
          Total : Rs. {total > 700 ? total : total + 50}
          /-
        </Text>
      </View>
      <View style={styles.viewStyle}>
        <Button mode="contained" onPress={CheckandSend}>
          {mode === "online" ? "Proceed To Pay" : "Place Your Order"}
        </Button>
      </View>
    </View>
  );
};

ProceedToPayView.propTypes = {
  cartData: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  sheetData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cartData: state.cart, //name of prop = alert
  userData: state.auth,
  sheetData: state.sheet,
  deliveryDate: state.deliverySlotReducer,
  deliveryData: state.delivery,
});

export default connect(mapStateToProps, null)(ProceedToPayView);

const styles = StyleSheet.create({
  checkOutPage: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: COLORS.white,
    width: "100%",
    elevation: 5,
    paddingVertical: hp("2%"),
  },
  viewStyle: { flex: 1, alignItems: "center", justifyContent: "center" },
});
