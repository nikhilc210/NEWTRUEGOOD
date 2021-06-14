import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../constants/theme";
//Required Imports
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";

import { navigate } from "../../../navigations/RootNavigation";

const LiveOrderListItem = ({
  item: { _id, order_total, order_details, delivery_status, id_ODDO },
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.orderNoTextStyle}>Order No: {id_ODDO}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.priceTextStyle}>₹ {order_total}</Text>
          <Text style={styles.itemCountTextStyle}>
            * {order_details.length} Items
          </Text>
        </View>
        <Text style={styles.orderStatusTextStyle}>
          Status: {delivery_status === "in_progress" && "Order just Placed."}
          {delivery_status === "shipped" && "Delivery Initiated by our Team."}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.bottomViewStyle}
        onPress={() => navigate("OrderDetailScreen", { orderId: _id })}
      >
        <Text style={styles.viewOrderDetailsTextStyle}>View Order Details</Text>
        <FontAwesome
          name="angle-right"
          size={hp("2.5%")}
          color={COLORS.black}
        />
      </TouchableOpacity>
    </View>
  );
};
export default LiveOrderListItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.textGrey,
    marginTop: hp("2%"),
    backgroundColor: "white",
    elevation: 1,
  },
  topView: {
    borderBottomColor: COLORS.textGrey,
    borderBottomWidth: 1,
    padding: hp("1.5%"),
  },
  orderNoTextStyle: {
    fontSize: RFValue(14),
    fontWeight: "700",
    fontFamily: FONTS.primaryFONT,
    color: COLORS.black,
  },
  priceTextStyle: {
    fontSize: RFValue(12),
    color: "#818596",
    fontFamily: FONTS.primaryFONT,
    marginTop: hp("0.5%"),
  },
  itemCountTextStyle: {
    fontSize: RFValue(12),
    color: "#818596",
    fontFamily: FONTS.primaryFONT,
    marginLeft: hp("2%"),
    marginTop: hp("0.5%"),
  },
  orderStatusTextStyle: {
    fontSize: RFValue(12),
    fontFamily: FONTS.primaryFONT,
    color: "#2F80ED",
    marginTop: hp("0.5%"),
    fontWeight: "bold",
  },
  bottomViewStyle: {
    padding: hp("1.5%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewOrderDetailsTextStyle: {
    fontSize: RFValue(13),
    fontFamily: FONTS.primaryFONT,
    color: COLORS.black,
  },
});
