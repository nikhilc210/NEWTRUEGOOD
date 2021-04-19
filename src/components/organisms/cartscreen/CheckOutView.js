import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { COLORS } from "../../../constants/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { getMinimumPrice } from "../../../../api";
import { checkInventory } from "../../../redux/actions/inventory";
import BottomSheet from "../../../screens/AuthScreens/BottomSheet";
import RegisterOTPSheet from "../../../screens/AuthScreens/RegisterOTPSheet";
import RegisterSheet from "../../../screens/AuthScreens/RegisterSheet";
import MobileBottomSheet from "../../../screens/AuthScreens/MobileBottomSheet";
import LoginOTPSheet from "../../../screens/AuthScreens/LoginOTPSheet";
import OTPBottomSheet from "../../../screens/AuthScreens/OTPBottomSheet";
import Toast from "react-native-simple-toast";

const CheckOutView = ({
  cartData: { items },
  userData: { isAuthenticated },
  checkInventory,
  sheetData: { bottomRef },
  inventoryData: { loading },
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
      if (total >= minimum) {
        checkInventory(items);
      } else {
        Toast.show(
          `Minimum cart value is ${minimum}. Add more items !`,
          Toast.SHORT
        );
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
          Total : Rs. {total > 900 ? total : total + 50}
          /-
        </Text>
      </View>
      <View style={styles.viewStyle}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Button mode="contained" onPress={CheckandSend}>
            Check Out
          </Button>
        )}
      </View>
      <BottomSheet />
      <RegisterSheet />
      <OTPBottomSheet />
      <MobileBottomSheet />
      <LoginOTPSheet />
      <RegisterOTPSheet />
    </View>
  );
};

CheckOutView.propTypes = {
  cartData: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  sheetData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cartData: state.cart,
  userData: state.auth,
  sheetData: state.sheet,
  inventoryData: state.inventory,
});

export default connect(mapStateToProps, { checkInventory })(CheckOutView);

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
