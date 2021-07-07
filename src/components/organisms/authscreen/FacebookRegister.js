import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { COLORS } from "../../../constants/theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { getDataFromFacebook } from "../../../services/authProvider/Facebook";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkUser } from "../../../redux/actions/auth";
import Toast from "react-native-simple-toast";
import { Alert } from "react-native";
import Dialog from "react-native-dialog";
import { TextInput } from "react-native";

const FacebookRegister = ({
  checkUser,
  sheetRef: { mobileRef, bottomRef },
  userData: { receivedData, facebookLoginLoading },
}) => {
  const [used, setUsed] = useState(false);
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (receivedData && !facebookLoginLoading && used) {
      bottomRef.current.close();
      setTimeout(() => {
        mobileRef.current.open();
      }, 500);

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

      if (userData.email) {
        await checkUser(userData, "fb");
      } else {
        Alert.alert(
          "Oops, Email is not available",
          "Please enter your email address to continue",
          [{ text: "Add New", onPress: () => setVisible(true) }]
        );
      }
    } else {
      alert("Login In Not Complete");
    }
  };

  const onConfirmPress = async () => {
    await checkUser({ email, name }, "fb");
    setVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.buttonStyle} onPress={() => _fbAuth()}>
          {facebookLoginLoading ? (
            <ActivityIndicator color={COLORS.primary} size="small" />
          ) : (
            <FontAwesome name="facebook" color="#44619c" size={20} />
          )}
        </Pressable>
      </View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Add Email Address</Dialog.Title>
        <Dialog.Input
          onChangeText={setEmail}
          value={email}
          label="Email"
          autoCapitalize="none"
        />
        <Dialog.Input
          onChangeText={setName}
          value={name}
          label="Name"
          autoCapitalize="none"
        />
        <Dialog.Button label="Confirm" onPress={onConfirmPress} />
      </Dialog.Container>
    </>
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
