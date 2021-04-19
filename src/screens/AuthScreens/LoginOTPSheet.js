import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Pressable,
} from "react-native";

//Required Imports
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
//Import Themes
import { COLORS, FONTS } from "../../constants/theme";
import { RFValue } from "react-native-responsive-fontsize";
import RBSheet from "react-native-raw-bottom-sheet";
import OTPTextView from "react-native-otp-textinput";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLoginOtpRef } from "../../redux/actions/sheet";
import { ActivityIndicator } from "react-native-paper";
import { loginUserMobile } from "../../redux/actions/auth";

const windowWidth = Dimensions.get("window").width;

function LoginOTPSheet({
  addLoginOtpRef,
  loginUserMobile,
  userData: { receivedNumber, loading, isAuthenticated },
  otpData: { otp },
  sheetRef: { bottomRef },
}) {
  const rbSheet = useRef(null);
  useEffect(() => {
    addLoginOtpRef(rbSheet);
  }, []);

  const [userOTP, setOTP] = useState("");

  const registerUserPress = async () => {
    if (otp === userOTP) {
      await loginUserMobile(receivedNumber);
      if (isAuthenticated && !loading) {
        rbSheet.current.close();
      }

      if (!isAuthenticated && !loading) {
        rbSheet.current.close();
        setTimeout(() => {
          bottomRef.current.open();
        }, 1000);
      }
    } else {
      alert("OTP didnot matched");
    }
  };
  return (
    <RBSheet
      ref={rbSheet}
      closeOnDragDown={true}
      height={hp(48)}
      customStyles={{
        container: {
          justifyContent: "center",
          alignItems: "center",
        },
        draggableIcon: {
          backgroundColor: "#fff",
        },
      }}
      closeOnDragDown={false}
      closeOnPressMask={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.wrapperView}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.signInTextStyle}>Enter Login OTP</Text>
          </View>
          <Text style={styles.captionTextStyle}>
            Please enter the otp you received
          </Text>
          <OTPTextView
            containerStyle={styles.textInputContainer}
            handleTextChange={(text) => setOTP(text)}
            inputCount={6}
            keyboardType="numeric"
          />
          <Pressable
            style={styles.loginButtonStyle}
            onPress={registerUserPress}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.loginTextStyle}>CONFIRM</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </RBSheet>
  );
}

LoginOTPSheet.propTypes = {
  addLoginOtpRef: PropTypes.func.isRequired,
  userData: PropTypes.object,
  loginUserMobile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.auth, //name of prop = alert
  otpData: state.otp,
  sheetRef: state.sheet, //name of prop = alert
});

export default connect(mapStateToProps, { addLoginOtpRef, loginUserMobile })(
  LoginOTPSheet
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white",
    backgroundColor: "white",
  },

  signInTextStyle: {
    fontSize: RFValue(20),
    color: COLORS.black,
    fontWeight: "bold",
    fontFamily: FONTS.primaryFONT,
  },
  captionTextStyle: {
    fontSize: RFValue(12),
    fontFamily: FONTS.primaryFONT,
  },
  loginButtonStyle: {
    height: hp("6%"),
    width: windowWidth - 40,
    borderRadius: hp("0.8%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    elevation: 5,
    marginTop: hp("4%"),
  },
  loginTextStyle: {
    fontSize: RFValue(12),
    color: COLORS.white,
    fontFamily: FONTS.primaryFONT,
  },
});
