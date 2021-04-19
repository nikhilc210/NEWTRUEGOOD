import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, ToastAndroid } from "react-native";
import { ActivityIndicator } from "react-native-paper";

//Theme & Icons
import { COLORS } from "../../../constants/theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//Facebook Login Imports
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { getDataFromFacebook } from "../../../services/authProvider/Facebook";

//Redux Imports
//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkUser } from "../../../redux/actions/auth";
import Toast from "react-native-simple-toast";

const FacebookRegister = ({
  checkUser,
  sheetRef: { mobileRef, bottomRef },
  userData: { receivedData, facebookLoginLoading },
}) => {
  const [used, setUsed] = useState(false);

  useEffect(() => {
    if (receivedData && !facebookLoginLoading && used) {
      bottomRef.current.close();
      setTimeout(() => {
        mobileRef.current.open();
      }, 100);
      Toast.show(
        "Account Created we need to verify you with mobile number please provide your mobile number",
        Toast.SHORT
      );
    }
  }, [receivedData, facebookLoginLoading]);

  //FB auth function::
  const _fbAuth = async () => {
    let { isCancelled } = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);
    if (!isCancelled) {
      setUsed(true);
      let data = await AccessToken.getCurrentAccessToken();
      let token = data?.accessToken;
      const userData = await getDataFromFacebook(token);
      await checkUser(userData, "fb");
    } else {
      alert("Login In Not Complete");
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.buttonStyle} onPress={() => _fbAuth()}>
        {facebookLoginLoading ? (
          <ActivityIndicator color={COLORS.primary} size="small" />
        ) : (
          <FontAwesome name="facebook" color="#44619c" size={20} />
        )}
      </Pressable>
    </View>
  );
};

FacebookRegister.propTypes = {
  checkUser: PropTypes.func.isRequired,
  userData: PropTypes.object,
  sheetRef: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userData: state.auth, //name of prop = alert
  sheetRef: state.sheet, //name of prop = alert
});

export default connect(mapStateToProps, { checkUser })(FacebookRegister);

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
