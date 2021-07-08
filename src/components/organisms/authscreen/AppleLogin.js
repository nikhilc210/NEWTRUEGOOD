import React, { useEffect } from "react";
import {
  appleAuth,
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { appleLoginUser } from "../../../redux/actions/auth";
import { COLORS } from "../../../constants/theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const AppleRegister = ({
  appleLoginUser,
  sheetRef: { bottomRef },
  userData: { receivedData, appleLoginLoading },
}) => {
  useEffect(() => {
    if (receivedData && !appleLoginLoading && used) {
      bottomRef.current.close();
    }
  }, [receivedData, appleLoginLoading]);

  async function onAppleButtonPress() {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const { email, fullName } = appleAuthRequestResponse;
        // alert(JSON.stringify(appleAuthRequestResponse));
        const sendData = {
          email,
          name: fullName?.givenName
            ? fullName?.givenName + " " + fullName.familyName
            : "",
        };

        await appleLoginUser(sendData);
      }
    } catch (error) {
      alert(error);
    }
  }

  if (!appleAuth.isSupported) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonStyle} onPress={onAppleButtonPress}>
        {appleLoginLoading ? (
          <ActivityIndicator color={COLORS.primary} size="small" />
        ) : (
          <FontAwesome name="apple" color="black" size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
};

AppleRegister.propTypes = {
  appleLoginUser: PropTypes.func.isRequired,
  userData: PropTypes.object,
  sheetRef: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userData: state.auth, //name of prop = alert
  sheetRef: state.sheet, //name of prop = alert
});

export default connect(mapStateToProps, { appleLoginUser })(AppleRegister);

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
