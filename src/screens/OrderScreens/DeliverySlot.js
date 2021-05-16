import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import DeliverySlotTopTabNavigator from "../../navigations/delivery-slot-top-tab-navigation";
import BackHeader from "../../components/inc/BackHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS } from "../../constants/theme";
import { useSelector } from "react-redux";
import { navigate } from "../../navigations/RootNavigation";

const DeliverySlot = () => {
  const deliverySlot = useSelector((state) => state.deliverySlotReducer);
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <BackHeader title="Proceed to Pay" />
      <DeliverySlotTopTabNavigator />
      {deliverySlot.isSelected ? (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigate("HomeScreen", { date: deliverySlot.date })}
          >
            <Text style={styles.buttonTextStyle}>SELECT SLOT</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};
export default DeliverySlot;

const styles = StyleSheet.create({
  buttonTextStyle: {
    fontSize: RFValue(16),
    color: COLORS.white,
    fontFamily: FONTS.primaryFONT,

    textAlignVertical: "top",
  },
  buttonContainer: {
    padding: hp("2%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
});
