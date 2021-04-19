import React from "react";
import { View, StyleSheet, TextInput, Dimensions } from "react-native";

import { Dialog } from "react-native-simple-dialogs";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS } from "../../../constants/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ViewAddressDialog = ({ data, dialogVisible, setDialogVisible }) => {
  return (
    <Dialog
      visible={dialogVisible}
      title="Address Details"
      onTouchOutside={() => setDialogVisible(false)}
    >
      <View>
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter First Name"
          value={data.firstName}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter Last Name"
          value={data.lastName}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter Mobile"
          value={data.number}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter Address Type"
          value={data.type}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter Street Address"
          multiline={true}
          numberOfLines={4}
          value={data.street_address}
          underlineColorAndroid="transparent"
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Enter City"
          value={data.city}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Pincode"
          value={data.pincode}
          underlineColorAndroid="transparent"
        />
      </View>
    </Dialog>
  );
};

export default ViewAddressDialog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: RFValue(14),
    color: COLORS.primary,
    fontFamily: FONTS.primaryFONT,
    fontWeight: "bold",
  },
  inputStyle: {
    marginTop: hp("2%"),
    height: hp("6%"),
    borderWidth: 1,
    borderColor: COLORS.textGrey,
    borderRadius: hp("0.8%"),
    width: Dimensions.get("window").width - 95,
    paddingLeft: hp("2%"),
  },
  loginButtonStyle: {
    height: hp("6%"),
    width: Dimensions.get("window").width - 95,
    borderRadius: hp("0.8%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    marginTop: hp("5%"),
  },
  loginTextStyle: {
    fontSize: RFValue(12),
    color: COLORS.white,
    fontFamily: FONTS.primaryFONT,
  },
  AddressDetail: {
    fontSize: RFValue(16),
    fontFamily: FONTS.primaryFONT,
    color: COLORS.black,
    fontWeight: "200",
    paddingRight: hp("1.5%"),
  },
  errorStyle: {
    fontSize: RFValue(8),
    fontFamily: FONTS.primaryFONT,
    color: "red",
  },
});
