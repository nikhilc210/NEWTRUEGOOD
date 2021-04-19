import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { GoogleSignin } from "react-native-google-signin";

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
        "684761604594-c0slm4murrsl1psfdur43bsp4vohp4jn.apps.googleusercontent.com",
      offlineAccess: false,
    });

    if (isAuthenticated && !googleLoginLoading) {
      bottomRef.current.close();
    }
  }, [isAuthenticated, googleLoginLoading]);

  const GoogleFunction = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(async (userData) => {
        const email = userData.user.email;
        const name = userData.user.name;

        let sendData = {
          email,
          name,
        };
        await googleLoginUser(sendData);
      });
    } catch (error) {
      console.warn("catch error", error.toString());
    }
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
