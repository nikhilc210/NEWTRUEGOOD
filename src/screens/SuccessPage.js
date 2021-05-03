import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

//Redux Imports
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { createOrder } from "../../api";
import { navigate } from "../navigations/RootNavigation";
import { EMPTY_CART } from "../redux/types";

import { ActivityIndicator } from "react-native-paper";
import { COLORS } from "../constants/theme";

const SuccessPage = ({
  cartData: { items },
  deliveryData,
  addressData: { activeAddress },
  route,
}) => {
  const { payment_mode, transaction_details } = route.params;

  const dispatch = useDispatch();
  useEffect(() => {
    const saveOrder = async () => {
      let delivery_slot_data = deliveryData.date + " " + deliveryData.time;
      const sendData = {
        order_line: items,
        delivery_address_id: activeAddress._id,
        delivery_slot: delivery_slot_data,
        payment_mode: payment_mode,
        transaction_details,
      };
      await createOrder(sendData);

      //empty cart
      dispatch({
        type: EMPTY_CART,
      });

      //empty slot
      dispatch({
        type: "SLOT_RESET",
      });
      navigate("MyOrderNavigator", { screen: "LiveOrderListScreen" });
    };
    saveOrder();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Order is processing...</Text>
      <ActivityIndicator color={COLORS.primary} size="small" />
    </View>
  );
};
SuccessPage.propTypes = {
  cartData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cartData: state.cart, //name of prop = alert
  deliveryData: state.deliverySlotReducer,
  addressData: state.delivery,
});

export default connect(mapStateToProps, null)(SuccessPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
