import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { Dialog } from "react-native-simple-dialogs";
import { Formik } from "formik";
import * as Yup from "yup";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS } from "../../../constants/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addAddress } from "../../../redux/actions/delivery";
import { ActivityIndicator } from "react-native-paper";
import { pincodeList } from "../../../api/static";

import DropDownPicker from "react-native-dropdown-picker";

const DeliverySchema = Yup.object().shape({
  firstname: Yup.string().required("Please enter your firstname"),
  lastname: Yup.string().required("Please enter your lastname"),
  pincode: Yup.string().required("Please enter your pincode"),
  streetAddress: Yup.string().required("Please enter your address"),
  city: Yup.string().required("Please enter your city"),
  addressType: Yup.string().required("Please enter the type"),
});

const AddAddressView = ({
  userData: { user },
  addAddress,
  deliveryData: { addDeliveryLoading },
}) => {
  const [dialogVisible, setDialogVisible] = useState(false);
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
    <>
      <View style={{ paddingTop: hp("4.0%") }}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => setDialogVisible(true)}
        >
          <AntDesign
            name="plus"
            color={COLORS.primary}
            size={hp("2.5%")}
            style={{ marginHorizontal: hp("1%") }}
          />

          <Text style={styles.textStyle}>Add new Address</Text>
        </TouchableOpacity>
      </View>
      <Dialog
        visible={dialogVisible}
        title="Add New Address"
        onTouchOutside={() => setDialogVisible(false)}
        dialogStyle={{ backgroundColor: "white" }}
      >
        <View>
          <Formik
            initialValues={{
              addressType: "",
              streetAddress: "",
              city: "",
              firstname: names.length > 0 ? names[0] : "",
              lastname: names.length > 0 ? names[1] : "",
              pincode: "",
              number: user?.mobile_no,
            }}
            validationSchema={DeliverySchema}
            onSubmit={async (values) => {
              await addAddress(values);
              setDialogVisible(false);
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
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Enter Address Type"
                  onChangeText={handleChange("addressType")}
                  onBlur={handleBlur("addressType")}
                  value={values.addressType}
                  underlineColorAndroid="transparent"
                />
                {errors.addressType && touched.addressType ? (
                  <Text style={styles.errorStyle}>{errors.addressType}</Text>
                ) : null}
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Enter Street Address"
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={handleChange("streetAddress")}
                  onBlur={handleBlur("streetAddress")}
                  value={values.streetAddress}
                  underlineColorAndroid="transparent"
                />
                {errors.streetAddress && touched.streetAddress ? (
                  <Text style={styles.errorStyle}>{errors.streetAddress}</Text>
                ) : null}

                <DropDownPicker
                  items={pincodes}
                  containerStyle={{ marginTop: hp("2%"), height: hp("6%") }}
                  style={{ backgroundColor: "white" }}
                  itemStyle={{
                    justifyContent: "flex-start",
                  }}
                  dropDownStyle={{ backgroundColor: "#fafafa" }}
                  onChangeItem={(item) => setFieldValue("pincode", item, true)}
                />

                {errors.pincode && touched.pincode ? (
                  <Text style={styles.errorStyle}>{errors.pincode}</Text>
                ) : null}
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
      </Dialog>
    </>
  );
};

AddAddressView.propTypes = {
  addAddress: PropTypes.func.isRequired,
  deliveryData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  deliveryData: state.delivery, //name of prop = alert
  userData: state.auth,
});

export default connect(mapStateToProps, { addAddress })(AddAddressView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
