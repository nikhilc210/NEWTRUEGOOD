import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS, FONTS } from "../../../constants/theme";
import { RFValue } from "react-native-responsive-fontsize";

const ActiveDeliveryItem = ({ data }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: hp("1%"),
        alignItems: "center",
      }}
    >
      <View style={{ marginLeft: hp("1%") }}>
        <Text style={styles.AddressTitle}>{data.type}</Text>
        <Text style={styles.AddressDetail}>{data.street_address}</Text>
      </View>
    </View>
  );
};

export default ActiveDeliveryItem;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  AddressTitle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.primaryFONT,
    color: COLORS.black,
    fontWeight: "700",
  },

  AddressDetail: {
    fontSize: RFValue(13),
    fontFamily: FONTS.primaryFONT,
    color: "#818596",
  },
  textStyle: {
    fontSize: RFValue(12),
    color: COLORS.primary,
    fontFamily: FONTS.primaryFONT,
    margin: hp("1%"),
    fontWeight: "700",
  },
});
