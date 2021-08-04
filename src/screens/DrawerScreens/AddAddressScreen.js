import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import BackHeader from "../../components/inc/BackHeader";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS } from "../../constants/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addAddress } from "../../redux/actions/delivery";
import { ActivityIndicator } from "react-native-paper";
import { pincodeList } from "../../api/static";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const DeliverySchema = Yup.object().shape({
  firstname: Yup.string().required("Please enter your firstname"),
  lastname: Yup.string().required("Please enter your lastname"),
  pincode: Yup.string().required("Please enter your pincode"),
  streetAddress: Yup.string().required("Please enter your address"),
  city: Yup.string().required("Please enter your city"),
  addressType: Yup.string().required("Please enter the type"),
});

const AddAddressScreen = ({
  userData: { user },
  addAddress,
  deliveryData: { addDeliveryLoading },
}) => {
  const [pincodes, setPincodes] = useState([]);

  let names = [];
  names = user?.name ? user?.name?.split(" ") : [];

  useEffect(() => {
    const loadData = async () => {
      let data = await pincodeList();

      let newData = [];

      data.map((d) =>
        newData.push({
          value: d.pincode,
          label: d.pincode,
          disabled: !d.isAvailable,
        })
      );

      setPincodes(newData || []);
    };

    loadData();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <BackHeader title="Add Delivery Address" />
          <View style={{ padding: 20 }}>
            <Formik
              initialValues={{
                addressType: "Home",
                streetAddress: "",
                city: "",
                firstname: names.length > 0 ? names[0] : "",
                lastname: names.length > 0 ? names[1] : "",
                pincode: "",
                number: user?.mobile_no,
              }}
              validationSchema={DeliverySchema}
              onSubmit={async (values, { resetForm }) => {
                await addAddress(values);
                resetForm({});
              }}
            >
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                handleBlur,
                setFieldValue,
              }) => (
                <>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter First Name"
                    onChangeText={handleChange("firstname")}
                    onBlur={handleBlur("firstname")}
                    value={values.firstname}
                    underlineColorAndroid="transparent"
                  />
                  {errors.firstname && touched.firstname ? (
                    <Text style={styles.errorStyle}>{errors.firstname}</Text>
                  ) : null}
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter Last Name"
                    onChangeText={handleChange("lastname")}
                    onBlur={handleBlur("lastname")}
                    value={values.lastname}
                    underlineColorAndroid="transparent"
                  />
                  {errors.lastname && touched.lastname ? (
                    <Text style={styles.errorStyle}>{errors.lastname}</Text>
                  ) : null}
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter Mobile"
                    onChangeText={handleChange("number")}
                    onBlur={handleBlur("number")}
                    value={values.number}
                    underlineColorAndroid="transparent"
                  />
                  {errors.number && touched.number ? (
                    <Text style={styles.errorStyle}>{errors.number}</Text>
                  ) : null}
                  <View style={styles.dropDownStyle}>
                    {Platform.OS === "android" ? (
                      <Picker
                        selectedValue={values?.addressType}
                        style={{
                          height: hp("5%"),
                          width: Dimensions.get("window").width - 40,
                        }}
                        onValueChange={(itemValue) =>
                          setFieldValue("addressType", itemValue, true)
                        }
                      >
                        <Picker.Item label="Home" value="Home" />
                        <Picker.Item label="Office" value="Office" />
                      </Picker>
                    ) : (
                      // <RNPickerSelect
                      //   style={{
                      //     width: Dimensions.get("window").width - 40,
                      //   }}
                      //   onValueChange={(itemValue) =>
                      //     setFieldValue("addressType", itemValue, true)
                      //   }
                      //   placeholder="Select address type"
                      //   items={[
                      //     { label: "Home", value: "Home" },
                      //     {
                      //       label: "Office",
                      //       value: "Office",
                      //     },
                      //   ]}
                      // />
                      <RNPickerSelect
                        style={{
                          width: Dimensions.get("window").width - 40,
                        }}
                        onValueChange={(itemValue) =>
                          setFieldValue("addressType", itemValue, true)
                        }
                        placeholder="Select address type"
                        items={[
                          { label: "Home", value: "Home" },
                          {
                            label: "Office",
                            value: "Office",
                          },
                        ]}
                      />
                    )}
                  </View>
                  {errors.addressType && touched.addressType ? (
                    <Text style={styles.errorStyle}>{errors.addressType}</Text>
                  ) : null}
                  <TextInput
                    style={[styles.inputStyle, { height: 70 }]}
                    placeholder="Enter Street Address"
                    multiline={true}
                    onChangeText={handleChange("streetAddress")}
                    onBlur={handleBlur("streetAddress")}
                    value={values.streetAddress}
                    underlineColorAndroid="transparent"
                  />
                  {errors.streetAddress && touched.streetAddress ? (
                    <Text style={styles.errorStyle}>
                      {errors.streetAddress}
                    </Text>
                  ) : null}

                  <View style={styles.dropDownStyle}>
                    {Platform.OS === "android" ? (
                      <Picker
                        selectedValue={values?.pincode}
                        style={{
                          height: hp("6%"),
                          width: Dimensions.get("window").width - 40,
                        }}
                        onValueChange={(itemValue) =>
                          setFieldValue("pincode", itemValue, true)
                        }
                      >
                        {pincodes?.map((pincode) => (
                          <Picker.Item
                            placeholder="Select Pincode"
                            key={pincode.value}
                            label={pincode.label}
                            value={pincode.value}
                            disabled={pincode.disabled}
                          />
                        ))}
                      </Picker>
                    ) : (
                      <RNPickerSelect
                        onValueChange={(itemValue) =>
                          setFieldValue("pincode", itemValue, true)
                        }
                        placeholder="Select Pincode"
                        items={pincodes}
                      />
                    )}
                  </View>

                  {errors.pincode && touched.pincode ? (
                    <Text style={styles.errorStyle}>{errors.pincode}</Text>
                  ) : null}

                  <Text style={{ fontSize: RFValue(12) }}>
                    If your Pin code is not here, we are working hard to Serve
                    you soon!
                  </Text>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter City"
                    onChangeText={handleChange("city")}
                    onBlur={handleBlur("city")}
                    value={values.city}
                    underlineColorAndroid="transparent"
                  />
                  {errors.city && touched.city ? (
                    <Text style={styles.errorStyle}>{errors.city}</Text>
                  ) : null}

                  <TouchableOpacity
                    style={styles.loginButtonStyle}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    {addDeliveryLoading ? (
                      <ActivityIndicator color={COLORS.white} size="small" />
                    ) : (
                      <Text style={styles.loginTextStyle}>Add</Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AddAddressScreen.propTypes = {
  addAddress: PropTypes.func.isRequired,
  deliveryData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  deliveryData: state.delivery, //name of prop = alert
  userData: state.auth,
});

export default connect(mapStateToProps, { addAddress })(AddAddressScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    width: Dimensions.get("window").width - 40,
    paddingLeft: hp("2%"),
  },
  loginButtonStyle: {
    height: hp("6%"),
    width: Dimensions.get("window").width - 40,
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
  dropDownStyle: {
    marginTop: hp("2%"),
    height: hp("6%"),
    borderWidth: 1,
    borderColor: COLORS.textGrey,
    borderRadius: hp("0.8%"),
    width: Dimensions.get("window").width - 40,
    padding: Platform.OS === "ios" ? hp("2%") : 0,
  },
});
