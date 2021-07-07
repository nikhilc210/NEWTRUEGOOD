import React, { useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { LoginManager, AccessToken } from "react-native-fbsdk";
import { getDataFromFacebook } from "../../../services/authProvider/Facebook";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { facebookLoginUser } from "../../../redux/actions/auth";
import { COLORS } from "../../../constants/theme";
import { ActivityIndicator } from "react-native-paper";

const FacebookLogin = ({
  userDataState: { facebookLoginLoading, isAuthenticated },
  facebookLoginUser,
  sheetRef: { bottomRef },
}) => {
  useEffect(() => {
    if (isAuthenticated && !facebookLoginLoading) {
      bottomRef.current.close();
    }
  }, [isAuthenticated, facebookLoginLoading]);
  ///Facebook Login to access Data
  const _fbAuth = async () => {

    let { isCancelled } = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);
    if (!isCancelled) {
      
      let data = await AccessToken.getCurrentAccessToken();
      let token = data.accessToken.toString();
      const userData = await getDataFromFacebook(token);
      await facebookLoginUser(userData);
    } else {
      alert("Login In Not Complete");
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.buttonStyle} onPress={_fbAuth}>
        {facebookLoginLoading ? (
          <ActivityIndicator color={COLORS.primary} size="small" />
        ) : (
          <FontAwesome name="facebook" color="#44619c" size={20} />
        )}
      </Pressable>
    </View>
  );
};

FacebookLogin.propTypes = {
  facebookLoginUser: PropTypes.func.isRequired,
  userDataState: PropTypes.object,
  sheetRef: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userDataState: state.auth, //name of prop = alert
  sheetRef: state.sheet, //name of prop = alert
});

export default connect(mapStateToProps, { facebookLoginUser })(FacebookLogin);

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
