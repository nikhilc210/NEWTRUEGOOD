import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

//Required Imports
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLORS, FONTS } from "../../../constants/theme";

//Formik Import
import { Formik } from "formik";
import * as Yup from "yup";
import Hr from "react-native-hr-component";

import FacebookRegister from "./FacebookRegister";
import GoogleRegister from "./GoogleRegister";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUserNumber } from "../../../redux/actions/auth";
import { sendOtp } from "../../../redux/actions/otp";
import { ActivityIndicator } from "react-native-paper";

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "Phone number is not valid"
    )
    .required("Please enter your phone number"),
});

const windowWidth = Dimensions.get("window").width;

const RegisterInputPart = ({
  addUserNumber,
  sheetRef: { bottomRef, registerOtpRef },
  sendOtp,
  optData: { loading, error },
}) => {
  const [sentOTP, setSentOTP] = useState(false);

  useEffect(() => {
    if (!error && !loading && sentOTP) {
      bottomRef.current.close();
      setTimeout(() => {
        registerOtpRef.current.open();
      }, 1000);
    }
  }, [error, loading]);

  //USER
  return (
    <View style={styles.container}>
      <View style={styles.socialLoginViewStyle}>
        <FacebookRegister />
        <GoogleRegister />
      </View>
      <View style={{ marginHorizontal: wp("20%") }}>
        <Hr lineColor={COLORS.textGrey} width={0.5} text="or" />
      </View>
      <View style={{ marginTop: hp("5%") }}>
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
              <TouchableOpacity
                style={styles.loginButtonStyle}
                onPress={handleSubmit}
              >
                {loading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.loginTextStyle}>Register Using Otp</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

RegisterInputPart.propTypes = {
  sheetRef: PropTypes.object,
  sendOtp: PropTypes.func.isRequired,
  optData: PropTypes.object,
  addUserNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.auth, //name of prop = alert
  sheetRef: state.sheet, //name of prop = alert
  optData: state.otp,
});

export default connect(mapStateToProps, { sendOtp, addUserNumber })(
  RegisterInputPart
);

const styles = StyleSheet.create({
  container: { marginTop: hp("3%"), marginBottom: hp("5%") },
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
