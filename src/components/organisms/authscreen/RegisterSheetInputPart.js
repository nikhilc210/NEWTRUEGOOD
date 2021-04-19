import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Pressable,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

//Required Imports
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../../constants/theme';

//Redux Imports
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {registerUser} from '../../../redux/actions/auth';
import {ActivityIndicator} from 'react-native-paper';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid Email')
    .required('Please enter your email'),
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
});

const windowWidth = Dimensions.get('window').width;

const RegisterSheetInputPart = ({
  userData: {receivedNumber, loading, isAuthenticated},
  registerUser,
  sheetRef: {registerSheetRef},
}) => {
  useEffect(() => {
    if (isAuthenticated && !loading) {
      registerSheetRef.current.close();
    }
  }, [isAuthenticated, loading]);

  //Register Function
  const registerUserFunction = async (values) => {
    let sendData = {
      email: values.email.toLowerCase(),
      name: values.firstName + ' ' + values.lastName,
      number: receivedNumber,
    };

    await registerUser(sendData);
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: hp('2%')}}>
        <Formik
          initialValues={{email: '', firstName: '', lastName: ''}}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            registerUserFunction(values);
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
                placeholder="Enter first name"
                placeholderTextColor={"#000000"}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                underlineColorAndroid="transparent"
              />
              {errors.firstName && touched.firstName ? (
                <Text style={styles.errorStyle}>{errors.firstName}</Text>
              ) : null}
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter last name"
                placeholderTextColor={"#000000"}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                underlineColorAndroid="transparent"
              />
              {errors.lastName && touched.lastName ? (
                <Text style={styles.errorStyle}>{errors.lastName}</Text>
              ) : null}
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter email"
                placeholderTextColor={"#000000"}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                underlineColorAndroid="transparent"
              />
              {errors.email && touched.email ? (
                <Text style={styles.errorStyle}>{errors.email}</Text>
              ) : null}
              <Pressable style={styles.loginButtonStyle} onPress={handleSubmit}>
                {loading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.loginTextStyle}>Register User</Text>
                )}
              </Pressable>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

RegisterSheetInputPart.propTypes = {
  sheetRef: PropTypes.object,
  userData: PropTypes.object,
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.auth, //name of prop = alert
  sheetRef: state.sheet, //name of prop = alert
});

export default connect(mapStateToProps, {registerUser})(RegisterSheetInputPart);

const styles = StyleSheet.create({
  container: {marginTop: hp('3%'), marginBottom: hp('5%')},
  inputStyle: {
    height: hp('6%'),
    borderWidth: 1,
    borderColor: COLORS.textGrey,
    borderRadius: hp('0.8%'),
    width: windowWidth - 40,
    paddingLeft: hp('2%'),
    marginVertical: hp('1%'),
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
