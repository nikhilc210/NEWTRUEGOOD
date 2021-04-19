import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
//all the images import
import { logo } from "../../constants/images";

//Required Imports
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { loadUser } from "../../redux/actions/auth";
import AsyncStorage from "@react-native-community/async-storage";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { navigate } from "../../navigations/RootNavigation";

const SplashScreen = ({ loadUser }) => {
  useEffect(() => {
    const load = async () => {
      var token = await AsyncStorage.getItem("TRUEGOOD:user_token");
      if (token) {
        loadUser(token);
      } else {
        navigate("DrawerNavigator");
      }
    };
    load();
  }, []);
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logoStyle} />
      <View style={styles.bottomTextStyle}>
        <Text>
          Made in India{"  "}
          <Image
            source={require("../../assets/images/india-flag.png")}
            style={{ height: hp("2%"), width: hp("2%") }}
          />
        </Text>
      </View>
    </View>
  );
};

SplashScreen.propTypes = {
  loadUser: PropTypes.func.isRequired,
};
export default connect(null, { loadUser })(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoStyle: { height: hp("13%"), width: hp("21%") },
  bottomTextStyle: {
    position: "absolute",
    bottom: 20,
  },
});
