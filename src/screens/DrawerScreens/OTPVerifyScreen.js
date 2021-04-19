import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';
import BackHeader from '../../components/inc/BackHeader';

//Required Imports
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../constants/theme';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {RFValue} from 'react-native-responsive-fontsize';
import {TouchableOpacity} from 'react-native-gesture-handler';

//Redux Imports
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateUserData} from '../../redux/actions/auth';
import {ActivityIndicator} from 'react-native-paper';
import {navigate} from '../../navigations/RootNavigation';

const windowWidth = Dimensions.get('window').width;

const LoginSchema = Yup.object().shape({
  inputOtp: Yup.string()
    .required('Please enter your otp')
    .length(6, 'Please enter your valid OTP'),
});

const OTPVerifyScreen = ({route, updateUserData, otpData: {otp}}) => {
  const {data} = route.params;

  const [loader, setLoader] = useState(false);

  const updateProfile = async (values) => {
    setLoader(true);
    const {inputOtp} = values;

    let sendData = {
      name: data.name,
      number: data.number,
    };

    if (otp === inputOtp) {
      await updateUserData(sendData);
      navigate('ProfileNavigator');
    } else {
      alert('OTP not matched');
    }
    setLoader(false);
  };
  return (
    <View style={styles.container}>
      <BackHeader title="Edit Profile" />
      <View style={{marginTop: hp('5%')}}>
        <Formik
          initialValues={{inputOtp: ''}}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            updateProfile(values);
          }}>
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
                placeholder="Enter OTP to change"
                onChangeText={handleChange('inputOtp')}
                onBlur={handleBlur('inputOtp')}
                value={values.inputOtp}
                underlineColorAndroid="transparent"
              />
              {errors.inputOtp && touched.inputOtp ? (
                <Text style={styles.errorStyle}>{errors.inputOtp}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.loginButtonStyle}
                onPress={handleSubmit}>
                {loader ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.loginTextStyle}>Verify OTP</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

OTPVerifyScreen.propTypes = {
  userData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userData: state.auth,
  otpData: state.otp,
});

export default connect(mapStateToProps, {updateUserData})(OTPVerifyScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputStyle: {
    height: hp('6%'),
    borderWidth: 1,
    borderColor: COLORS.textGrey,
    borderRadius: hp('0.8%'),
    width: windowWidth - 40,
    paddingLeft: hp('2%'),
    marginTop: hp('2%'),
  },
  loginButtonStyle: {
    height: hp('6%'),
    width: windowWidth - 40,
    borderRadius: hp('0.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    elevation: 5,
    marginTop: hp('3%'),
  },
  loginTextStyle: {
    fontSize: RFValue(12),
    color: COLORS.white,
    fontFamily: FONTS.primaryFONT,
  },
  errorStyle: {
    fontSize: RFValue(8),
    fontFamily: FONTS.primaryFONT,
    color: 'red',
  },
  socialLoginViewStyle: {
    marginBottom: hp('5%'),
    flexDirection: 'row',
  },
});
