import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { TouchableOpacity } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../../constants/theme";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { googleLoginUser } from "../../../redux/actions/auth";
import { ActivityIndicator } from "react-native-paper";

const GoogleLogin = ({
  userDataState: { isAuthenticated, googleLoginLoading },
  googleLoginUser,
  sheetRef: { bottomRef },
}) => {
  //If this works i will be happy!!!
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["email"],
      webClientId:
        "134975082543-7smto7dgsmad5rj19gs7g7sdjq2b1qgc.apps.googleusercontent.com",
      offlineAccess: false,
      // iosClientId:
      //   "134975082543-r66d0dvvhmdp0urv58lb5fq6lbkauom5.apps.googleusercontent.com",
    });
    if (isAuthenticated && !googleLoginLoading) {
      bottomRef.current.close();
    }
  }, [isAuthenticated, googleLoginLoading]);

  const GoogleFunction = async () => {
    try {
      await GoogleSignin.configure({
        scopes: ["email"],
        webClientId:
          "134975082543-7smto7dgsmad5rj19gs7g7sdjq2b1qgc.apps.googleusercontent.com",
        offlineAccess: false,
        // iosClientId:
        //   "134975082543-r66d0dvvhmdp0urv58lb5fq6lbkauom5.apps.googleusercontent.com",
      });
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);

      const email = userInfo.user.email;
      const name = userInfo.user.name;

      let sendData = {
        email,
        name,
      };
      await googleLoginUser(sendData);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Sign In cancelled");
        console.log(error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("In progress");
        console.log(error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("pLay");
        console.log(error);
      } else {
        console.log(error);
        // some other error happened
      }
    }

    // try {
    //   await GoogleSignin.signOut();

    //   await GoogleSignin.hasPlayServices();
    //   let userData = await GoogleSignin.signIn();

    //   const email = userData.user.email;
    //   const name = userData.user.name;

    //   let sendData = {
    //     email,
    //     name,
    //   };
    //   await googleLoginUser(sendData);
    // } catch (error) {
    //   console.warn("catch error", error.toString());
    // }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={GoogleFunction} style={styles.buttonStyle}>
        {googleLoginLoading ? (
          <ActivityIndicator color={COLORS.primary} size="small" />
        ) : (
          <FontAwesome name="google" color="red" size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
};

GoogleLogin.propTypes = {
  googleLoginUser: PropTypes.func.isRequired,
  userDataState: PropTypes.object,
  sheetRef: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userDataState: state.auth, //name of prop = alert
  sheetRef: state.sheet, //name of prop = alert
});

export default connect(mapStateToProps, { googleLoginUser })(GoogleLogin);

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
