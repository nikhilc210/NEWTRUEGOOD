import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../../constants/theme';

import {Dialog} from 'react-native-simple-dialogs';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {RFValue} from 'react-native-responsive-fontsize';

const DeliverySchema = Yup.object().shape({
  coupon: Yup.string()
    .min(100, 'Please enter valid coupon')
    .required('Please enter valid coupon'),
});

const ApplyCoupon = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() => setDialogVisible(true)}>
        <MaterialCommunityIcons
          name={'brightness-percent'}
          size={hp(2.5)}
          color={COLORS.primary}
          style={{
            paddingHorizontal: hp('0.5%'),
            alignSelf: 'flex-start',
          }}
        />
        <Text>Apply Coupon</Text>
        <EvilIcons
          name="chevron-right"
          color={COLORS.primary}
          size={hp('3%')}
          style={{paddingHorizontal: hp('0.5%'), alignSelf: 'flex-end'}}
        />
      </Pressable>
      <Dialog
        visible={dialogVisible}
        title="Apply Coupon"
        onTouchOutside={() => setDialogVisible(false)}>
        <View>
          <Formik
            initialValues={{
              coupon: '',
            }}
            validationSchema={DeliverySchema}
            onSubmit={(values) => {
              console.log(values);
            }}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              handleBlur,
            }) => (
              <>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Enter Coupon"
                  onChangeText={handleChange('coupon')}
                  onBlur={handleBlur('coupon')}
                  value={values.coupon}
                  underlineColorAndroid="transparent"
                />
                {errors.coupon && touched.coupon ? (
                  <Text style={styles.errorStyle}>{errors.coupon}</Text>
                ) : null}
                <Pressable
                  style={styles.loginButtonStyle}
                  onPress={() => {
                    handleSubmit();
                  }}>
                  <Text style={styles.loginTextStyle}>Add</Text>
                </Pressable>
              </>
            )}
          </Formik>
        </View>
      </Dialog>
    </>
  );
};
export default ApplyCoupon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('2%'),
    marginTop: hp('2%'),
    paddingHorizontal: hp('2%'),
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: RFValue(14),
    color: COLORS.primary,
    fontFamily: FONTS.primaryFONT,
    fontWeight: 'bold',
  },
  inputStyle: {
    marginTop: hp('2%'),
    height: hp('6%'),
    borderWidth: 1,
    borderColor: COLORS.textGrey,
    borderRadius: hp('0.8%'),
    width: Dimensions.get('window').width - 95,
    paddingLeft: hp('2%'),
  },
  loginButtonStyle: {
    height: hp('6%'),
    width: Dimensions.get('window').width - 95,
    borderRadius: hp('0.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginTop: hp('5%'),
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
    fontWeight: '200',
    paddingRight: hp('1.5%'),
  },
  errorStyle: {
    fontSize: RFValue(10),
    fontFamily: FONTS.primaryFONT,
    color: 'red',
  },
});
