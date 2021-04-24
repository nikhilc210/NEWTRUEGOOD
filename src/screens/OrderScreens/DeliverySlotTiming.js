import React from "react";
import { View, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import DeliverySlotButton from "../../components/atoms/DeliverySlotButton";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS } from "../../constants/theme";
import moment from "moment";
let currentDate = moment(new Date()).format("MMM DD");

let checkEndTime;
var color = "black";

const DeliverySlotTiming = (props) => {
  const times = [
    { index: 0, value: "06-11 AM" },
    { index: 1, value: "13-16 PM" },
    { index: 2, value: "17-22 PM" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {times.map((value) => {
          let splitvalue = value.value;
          let splitvalue1 = splitvalue.split("-");
          checkEndTime = splitvalue1[1];
          checkEndTime = checkEndTime.split(" ")[0];

          let date = new Date();
          let hours = date.getHours();
          let TimeBool = checkEndTime > hours + 7;
          if (currentDate === props.date) {
            if (TimeBool === true) {
              color = "black";
            } else {
              color = "lightgrey";
            }
          } else {
            color = "black";
          }

          return (
            <DeliverySlotButton
              time={value.value}
              key={value.value}
              date={props.date}
              color={color}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
export default DeliverySlotTiming;

const styles = StyleSheet.create({
  container: {
    padding: hp("2%"),
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },

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
