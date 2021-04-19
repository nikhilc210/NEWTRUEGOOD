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

//OTPS::
import {sendOtp} from '../../redux/actions/otp';
import {navigate} from '../../navigations/RootNavigation';

const windowWidth = Dimensions.get('window').width;

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      'Phone number is not valid',
    )
    .required('Please enter your phone number'),
  name: Yup.string().required('Please enter your name'),
});

const ProfileScreen = ({userData: {user}, updateUserData, sendOtp}) => {
  const {name, mobile_no} =
    user === null
      ? {
          name: '',
          mobile_no: '',
        }
      : user;

  const [loader, setLoader] = useState(false);

  const updateProfile = async (data) => {
    setLoader(true);
    const {name, phoneNumber} = data;

    let sendData = {
      name,
      number: phoneNumber,
    };

    if (phoneNumber !== mobile_no) {
      await sendOtp(phoneNumber);
      setLoader(false);
      navigate('OTPNavigator', {data: sendData});
    } else {
      await updateUserData(sendData);
    }
    setLoader(false);
  };
  return (
    <View style={styles.container}>
      <BackHeader title="Edit Profile" />
      <View style={{marginTop: hp('5%')}}>
        <Formik
          initialValues={{phoneNumber: mobile_no, name: name}}
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
                placeholder="Enter Full Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                underlineColorAndroid="transparent"
              />
              {errors.name && touched.name ? (
                <Text style={styles.errorStyle}>{errors.name}</Text>
              ) : null}
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter mobile number"
                keyboardType="number-pad"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                underlineColorAndroid="transparent"
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <Text style={styles.errorStyle}>{errors.phoneNumber}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.loginButtonStyle}
                onPress={handleSubmit}>
                {loader ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.loginTextStyle}>Update Profile</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

ProfileScreen.propTypes = {
  userData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userData: state.auth,
});

export default connect(mapStateToProps, {updateUserData, sendOtp})(
  ProfileScreen,
);

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
