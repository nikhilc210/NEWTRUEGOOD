import React from "react";
import LottieView from "lottie-react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ProductLoader = () => {
  return (
    <LottieView
      style={{ height: hp("15%"), alignSelf: "center", marginTop: hp("10%") }}
      source={require("../../assets/images/loader.json")}
      autoPlay
      loop
    />
  );
};

export default ProductLoader;
