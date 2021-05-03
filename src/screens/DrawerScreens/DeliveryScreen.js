import React, { useState } from "react";
import { View, StyleSheet, Text, Alert, Pressable } from "react-native";
import BackHeader from "../../components/inc/BackHeader";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS, FONTS } from "../../constants/theme";
import { RFValue } from "react-native-responsive-fontsize";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAddress,
  setActiveAddress,
  deleteAddress,
} from "../../redux/actions/delivery";
import { RadioButton } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import ViewAddressDialog from "../../components/organisms/deliveryScreen/ViewAddressDialog";
import AntDesign from "react-native-vector-icons/AntDesign";
import { navigate } from "../../navigations/RootNavigation";

const DeliveryScreen = ({
  getAddress,
  deliveryData: { loading, addresses, activeAddress },
  setActiveAddress,
  deleteAddress,
}) => {
  useFocusEffect(
    React.useCallback(() => {
      getAddress();
    }, [])
  );

  const makeAddressActive = (data) => {
    setActiveAddress(data);
  };

  const deleteHandler = (id) => {
    setLoader(true);
    Alert.alert("Confirm", "Are you sure you want to delete?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await deleteAddress(id);
        },
      },
    ]);
    setLoader(false);
  };

  const [loader, setLoader] = useState(false);
  const [viewData, setViewData] = useState({});
  const [viewVisible, setViewVisible] = useState(false);

  return (
    <View style={styles.container}>
      <BackHeader title="Delivery Address" />
      {loading ? (
        <Text>Getting addresses....</Text>
      ) : (
        addresses?.map((address, index) => {
          return (
            <View style={styles.wrapper} key={index}>
              <RadioButton
                value={address}
                status={
                  activeAddress
                    ? address?._id === activeAddress?._id
                      ? "checked"
                      : "unchecked"
                    : "unchecked"
                }
                onPress={() => makeAddressActive(address)}
              />
              <View style={{ marginLeft: hp("1%") }}>
                <Pressable
                  onPress={() => {
                    setViewData(address);
                    setViewVisible(true);
                  }}
                >
                  <Text style={styles.AddressTitle}>{address.number}</Text>
                  <Text style={styles.AddressTitle}>{address.type}</Text>
                  <Text style={styles.AddressDetail}>
                    {address.street_address}
                  </Text>
                </Pressable>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={styles.textStyle}
                    onPress={() => {
                      setViewData(address);
                      setViewVisible(true);
                    }}
                  >
                    View
                  </Text>
                  {loader ? (
                    <Text>Deleting...</Text>
                  ) : (
                    <Text
                      style={styles.textStyle}
                      onPress={() => deleteHandler(address._id)}
                    >
                      Delete
                    </Text>
                  )}
                </View>
              </View>
            </View>
          );
        })
      )}
      <Pressable
        style={{
          flexDirection: "row",
        }}
        onPress={() => navigate("AddAddressScreen")}
      >
        <AntDesign
          name="plus"
          color={COLORS.primary}
          size={hp("4%")}
          style={{ marginHorizontal: hp("1%") }}
        />

        <Text style={styles.textStyle}>Add new Address</Text>
      </Pressable>
      <ViewAddressDialog
        data={viewData}
        dialogVisible={viewVisible}
        setDialogVisible={setViewVisible}
      />
    </View>
  );
};

DeliveryScreen.propTypes = {
  getAddress: PropTypes.func.isRequired,
  deliveryData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  deliveryData: state.delivery, //name of prop = alert
});

export default connect(mapStateToProps, {
  getAddress,
  setActiveAddress,
  deleteAddress,
})(DeliveryScreen);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  AddressTitle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.primaryFONT,
    color: COLORS.black,
    fontWeight: "700",
  },

  AddressDetail: {
    fontSize: RFValue(13),
    fontFamily: FONTS.primaryFONT,
    color: "#818596",
  },
  textStyle: {
    fontSize: RFValue(12),
    color: COLORS.primary,
    fontFamily: FONTS.primaryFONT,
    margin: hp("1%"),
    fontWeight: "700",
  },
  wrapper: {
    flexDirection: "row",
    margin: hp("1%"),
    alignItems: "center",
  },
});
