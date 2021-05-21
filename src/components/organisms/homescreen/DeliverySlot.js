import React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS } from "../../../constants/theme";
import { useSelector } from "react-redux";
import { navigate } from "../../../navigations/RootNavigation";
import { Button } from "react-native-paper";

const DeliverySlot = ({ isCartPage = false }) => {
  const deliverySlot = useSelector((state) => state.deliverySlotReducer);

  if (isCartPage === true) {
    return (
      <Pressable
        style={styles.containerCartStyle}
        onPress={() => navigate("DeliverySlot")}
      >
        <Text
          style={[
            styles.headerText,
            { paddingHorizontal: hp("0%") },
            { color: "black" },
          ]}
        >
          Delivery Slot :
        </Text>
        <View
          style={{
            flex: 2,
            paddingLeft: hp(2),
          }}
        >
          <Button mode="contained">
            {deliverySlot.time} {"   "}
            {deliverySlot.date}
          </Button>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigate("DeliverySlot")}
    >
      <Text
        style={[
          styles.headerText,
          { paddingHorizontal: hp("0%") },
          { color: "black" },
        ]}
      >
        Delivery Slot :
      </Text>
      <Text
        style={[
          styles.headerText,
          {
            color: "black",
            flex: 2,
            fontWeight: "700",
            fontSize: RFValue(12),
            textAlign: "left",
            paddingLeft: hp(2),
          },
        ]}
      >
        {deliverySlot.time} {"   "}
        {deliverySlot.date}
      </Text>
      <AntDesign
        name="right"
        color="black"
        size={hp("2%")}
        style={{ paddingHorizontal: hp("0.5%"), alignSelf: "flex-end" }}
      />
    </Pressable>
  );
};
export default DeliverySlot;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: hp("2%"),
    paddingHorizontal: hp("2%"),
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: COLORS.white,
  },
  containerCartStyle: {
    flexDirection: "row",
    paddingVertical: hp("2%"),
    paddingHorizontal: hp("2%"),
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: COLORS.white,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
