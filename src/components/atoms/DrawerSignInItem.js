import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { COLORS, FONTS } from "../../constants/theme";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFValue } from "react-native-responsive-fontsize";
import { closeDrawer, navigate } from "../../navigations/RootNavigation";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";

function DrawerSignInItem({ sheetRef: { bottomRef }, userData: { user } }) {
  const openBottomRef = () => {
    bottomRef.current.open();
  };
  return (
    <>
      {user ? (
        <TouchableWithoutFeedback onPress={() => navigate("ProfileNavigator")}>
          <View style={styles.container}>
            <View style={styles.innerViewStyle}>
              <FontAwesome
                name="user-circle-o"
                size={hp("2.5%")}
                color={COLORS.primary}
              />
              <View>
                <Text style={styles.signInTextStyle}>{user?.email}</Text>
                <Text style={styles.nameTextStyle}>{user?.name}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            closeDrawer();
            openBottomRef();
          }}
        >
          <View style={styles.container}>
            <View style={styles.innerViewStyle}>
              <FontAwesome
                name="user-circle-o"
                size={hp("2.5%")}
                color={COLORS.primary}
              />
              <Text style={styles.signInTextStyle}>Sign In</Text>
            </View>
            <FontAwesome
              name="angle-right"
              size={hp("3%")}
              color={COLORS.black}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

DrawerSignInItem.propTypes = {
  sheetRef: PropTypes.object,
  userData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  sheetRef: state.sheet, //name of prop = alert
  userData: state.auth,
});

export default connect(mapStateToProps, null)(DrawerSignInItem);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomColor: COLORS.textGrey,
    borderBottomWidth: 1,
    flexDirection: "row",
    padding: hp("2%"),
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerViewStyle: { flexDirection: "row", alignItems: "center" },
  signInTextStyle: {
    fontSize: RFValue(11),
    fontWeight: "700",
    marginLeft: hp("1%"),
    fontFamily: FONTS.primaryFONT,
    color: COLORS.black,
  },
  nameTextStyle: {
    fontSize: RFValue(10),
    marginLeft: hp("1%"),
    fontFamily: FONTS.primaryFONT,
    color: COLORS.textGrey,
  },
});
