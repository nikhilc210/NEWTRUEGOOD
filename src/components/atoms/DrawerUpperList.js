import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS, FONTS } from "../../constants/theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { navigate } from "../../navigations/RootNavigation";
import Ionicons from "react-native-vector-icons/Ionicons";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LogOut } from "../../redux/actions/auth";
import { Alert } from "react-native";
import {
  appleAuth,
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";
const DrawerUpperList = ({ LogOut }) => {
  const onLogOutPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGOUT,
      });
    } catch (error) {
      console.log("Error", error);
    }
    console.log("NOT");

    Alert.alert("Confirm", "Do you want to sign out?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "OK", onPress: () => LogOut() },
    ]);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.singleListViewStyle}
        onPress={() => navigate("MyOrderNavigator")}
      >
        <Text style={styles.titleTextStyle}>My Orders</Text>
        <FontAwesome name="angle-right" size={hp("3%")} color={COLORS.black} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.singleListViewStyle}
        onPress={() => navigate("DeliveryNavigator")}
      >
        <Text style={styles.titleTextStyle}>Delivery Address</Text>
        <FontAwesome name="angle-right" size={hp("3%")} color={COLORS.black} />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.singleListViewStyle}
        onPress={() => navigate("InviteFriendNavigator")}
      >
        <Text style={styles.titleTextStyle}>Invite your Friend</Text>
        <FontAwesome name="angle-right" size={hp("3%")} color={COLORS.black} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.singleListViewStyle}
        onPress={() => navigate("NotificationNavigator")}
      >
        <Text style={styles.titleTextStyle}>Notifications</Text>
        <FontAwesome name="angle-right" size={hp("3%")} color={COLORS.black} />
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.singleListViewStyle}
        onPress={onLogOutPress}
      >
        <Text style={styles.titleTextStyle}>Sign Out</Text>
        <Ionicons name="exit-outline" size={hp("2.5%")} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
};

DrawerUpperList.propTypes = {
  LogOut: PropTypes.func.isRequired,
};

export default connect(null, { LogOut })(DrawerUpperList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.textGrey,
  },
  singleListViewStyle: {
    width: "100%",
    padding: hp("2%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleTextStyle: {
    fontSize: RFValue(13),
    fontFamily: FONTS.primaryFONT,
    color: COLORS.black,
  },
});
