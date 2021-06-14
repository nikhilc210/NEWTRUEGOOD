import React from "react";
import { View, StyleSheet } from "react-native";
//Required Imports
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import StepIndicator from "react-native-step-indicator";

const labels = ["Order Placed", "Order Shipped", "Order Delivered"];

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  seperatorStrokeBorderStyle: "dashed",
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#60B246",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#60B246",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#60B246",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#60B246",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#60B246",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#60B246",
};

const OrderStatusStepperView = ({ currentPosition }) => {
  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        stepCount={3}
        labels={labels}
      />
    </View>
  );
};
export default OrderStatusStepperView;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("3%"),
    borderTopColor: "#B7BCC6",
    borderTopWidth: 1,
    paddingTop: hp("3%"),
  },
});
