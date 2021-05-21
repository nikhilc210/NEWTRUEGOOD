import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
//
import { FONTS, COLORS } from "../../constants/theme";

const SingleCategoryItem = ({ data: { image_URL, name, _id } }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={{ uri: image_URL }} style={styles.imageStyle} />
      </View>
      <Text style={styles.categoryNameTextStyle} numberOfLines={2}>
        {name}
      </Text>
    </View>
  );
};
export default SingleCategoryItem;

const styles = StyleSheet.create({
  wrapper: { width: wp("20%"), marginTop: hp("1%") },
  container: {
    height: wp("22%"),
    width: wp("22%"),
    borderRadius: wp("15%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  imageStyle: { height: wp("20%"), width: wp("20%"), borderRadius: wp("15%") },
  categoryNameTextStyle: {
    fontSize: RFValue(10),
    fontFamily: FONTS.primaryFONT,
    color: COLORS.black,
    textAlign: "center",
  },
});
