import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";
import { navigate } from "../../navigations/RootNavigation";
import { RFValue } from "react-native-responsive-fontsize";

const PaymentHeader = () => {
  const onBackPress = () => {
    navigate("TabNavigator", { screen: "Home" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.leftPart}>
          <TouchableOpacity onPress={onBackPress}>
            <Feather name="arrow-left" color="white" size={20}></Feather>
          </TouchableOpacity>
        </View>
        <View style={styles.innerPart}>
          <Text style={styles.titleTextStyle}>My Orders</Text>
        </View>
        <View style={styles.rightPart}></View>
      </View>
    </View>
  );
};

export default PaymentHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "#1CA953",
    width: "100%",
  },
  leftPart: { flex: 1, alignItems: "center", justifyContent: "center" },
  innerPart: { flex: 5, justifyContent: "center" },
  rightPart: { flex: 1, alignItems: "center", justifyContent: "center" },
  titleTextStyle: { fontSize: RFValue(13), color: "white" },
});
