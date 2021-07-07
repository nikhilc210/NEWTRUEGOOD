import React from "react";
import { View, StyleSheet, ToastAndroid, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";

//Theme & Icons
import { COLORS } from "../../../constants/theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//Facebook Login Imports
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import Toast from "react-native-simple-toast";

//Redux Imports
//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkUser } from "../../../redux/actions/auth";

const GoogleRegister = ({
  checkUser,
  sheetRef: { mobileRef, bottomRef },
  userData: { googleLoginLoading, receivedData },
}) => {
  const GoogleFunction = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.configure({
        scopes: ["email"],
        webClientId:
          "134975082543-7smto7dgsmad5rj19gs7g7sdjq2b1qgc.apps.googleusercontent.com",
        offlineAccess: false,
      });
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn()
        .then(async (userData) => {
          const email = userData.user.email;
          const name = userData.user.name;

          let sendData = {
            email,
            name,
          };
          const response = await checkUser(sendData, "google");

          if (receivedData && response !== null) {
            bottomRef.current.close();
            setTimeout(() => {
              mobileRef.current.open();
            }, 1000);
            Toast.show(
              "Account Created we need to verify you with mobile number please provide your mobile number",
              Toast.SHORT
            );
          }
        })
        .catch((err) => alert(err.toString()))
        .done();
    } catch (error) {
      console.warn("catch error", error.toString());
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonStyle} onPress={GoogleFunction}>
        {googleLoginLoading ? (
          <ActivityIndicator color={COLORS.primary} size="small" />
        ) : (
          <FontAwesome name="google" color="red" size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
};
GoogleRegister.propTypes = {
  checkUser: PropTypes.func.isRequired,
  userData: PropTypes.object,
  sheetRef: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userData: state.auth, //name of prop = alert
  sheetRef: state.sheet, //name of prop = alert
});

export default connect(mapStateToProps, { checkUser })(GoogleRegister);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: COLORS.textGrey,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
