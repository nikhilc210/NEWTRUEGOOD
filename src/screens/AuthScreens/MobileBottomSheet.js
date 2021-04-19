import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";

//Required Imports
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
//Import Themes
import { COLORS, FONTS } from "../../constants/theme";
import { RFValue } from "react-native-responsive-fontsize";
import RBSheet from "react-native-raw-bottom-sheet";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addMobileRef } from "../../redux/actions/sheet";
import { addUserNumber } from "../../redux/actions/auth";

//Formik Import
import { Formik } from "formik";
import * as Yup from "yup";
import { sendOtp } from "../../redux/actions/otp";
import { ActivityIndicator } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Phone number is not valid"
    )
    .required("Please enter your phone number"),
});

function MobileBottomSheet({
  addMobileRef,
  addUserNumber,
  sendOtp,
  sheetRef: { mobileRef, otpRef },
  optData: { loading, error },
}) {
  const rbSheet = useRef(null);

  const [sentOTP, setSentOTP] = useState(false);

  useEffect(() => {
    addMobileRef(rbSheet);
  }, []);

  useEffect(() => {
    if (!error && !loading && sentOTP) {
      mobileRef.current.close();
      setTimeout(() => {
        otpRef.current.open();
      }, 1000);
    }
  }, [error, loading, sentOTP]);

  return (
    <RBSheet
      ref={rbSheet}
      closeOnDragDown={false}
      height={hp(45)}
      customStyles={{
        container: {
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.signInTextStyle}>Enter Mobile</Text>
        </View>
        <Text
          style={{
            marginTop: hp("1%"),
            color: COLORS.primary,
            alignItems: "center",
          }}
        >
          Your account has been created.Please verify the mobile number.
        </Text>
        <View style={{ marginTop: hp("4%") }}>
          <Formik
            initialValues={{ phoneNumber: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              setSentOTP(true);
              addUserNumber(values.phoneNumber);
              await sendOtp(values.phoneNumber);
            }}
          >
            {({
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              handleSubmit,
            }) => (
              <>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Enter mobile number"
                  keyboardType="number-pad"
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  underlineColorAndroid="transparent"
                  maxLength={10}
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <Text style={styles.errorStyle}>{errors.phoneNumber}</Text>
                ) : null}
                <Pressable
                  style={styles.loginButtonStyle}
                  onPress={handleSubmit}
                >
                  {loading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text style={styles.loginTextStyle}>Send the OTP</Text>
                  )}
                </Pressable>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </RBSheet>
  );
}
MobileBottomSheet.propTypes = {
  addMobileRef: PropTypes.func.isRequired,
  sheetRef: PropTypes.object,
  addUserNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.auth, //name of prop = alert
  sheetRef: state.sheet, //name of prop = alert
  optData: state.otp,
});

export default connect(mapStateToProps, {
  addMobileRef,
  addUserNumber,
  sendOtp,
})(MobileBottomSheet);

const styles = StyleSheet.create({
  container: {
    marginBottom: hp("5%"),
    marginTop: hp("2%"),
    flex: 1,
    alignItems: "center",
  },
  signInTextStyle: {
    fontSize: RFValue(20),
    color: COLORS.black,
    fontWeight: "bold",
    fontFamily: FONTS.primaryFONT,
  },
  inputStyle: {
    height: hp("6%"),
    borderWidth: 1,
    borderColor: COLORS.textGrey,
    borderRadius: hp("0.8%"),
    width: windowWidth - 40,
    paddingLeft: hp("2%"),
  },
  loginButtonStyle: {
    height: hp("6%"),
    width: windowWidth - 40,
    borderRadius: hp("0.8%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    elevation: 5,
    marginTop: hp("3%"),
  },
  loginTextStyle: {
    fontSize: RFValue(12),
    color: COLORS.white,
    fontFamily: FONTS.primaryFONT,
  },
  errorStyle: {
    fontSize: RFValue(8),
    fontFamily: FONTS.primaryFONT,
    color: "red",
  },
  socialLoginViewStyle: {
    marginBottom: hp("5%"),
    flexDirection: "row",
  },
});
