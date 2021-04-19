import React, { useRef, useEffect, useState, createRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
//all the images import
//Required Imports
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
//Import Themes
import { COLORS } from "../../constants/theme";
import { RFValue } from "react-native-responsive-fontsize";
import RBSheet from "react-native-raw-bottom-sheet";

import LoginInputPart from "../../components/organisms/authscreen/LoginInputPart";
import RegisterInputPart from "../../components/organisms/authscreen/RegisterInputPart";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBottomRef, initialSheetOpen } from "../../redux/actions/sheet";

//export const rbSheet = createRef();

function BottomSheet({
  addBottomRef,
  initialSheetOpen,
  sheetData: { alreadyOpened },
  userData: { isAuthenticated },
}) {
  const rbSheet = useRef(null);
  useEffect(() => {
    addBottomRef(rbSheet);

    if (!isAuthenticated) {
      if (!alreadyOpened) {
        initialSheetOpen();
        rbSheet.current.open();
      }
    }
  }, []);

  const [active, setActive] = useState(true);

  return (
    <RBSheet
      ref={rbSheet}
      closeOnDragDown={false}
      height={hp(50)}
      customStyles={{
        draggableIcon: {
          backgroundColor: "#fff",
        },
      }}
      closeOnDragDown={false}
      closeOnPressMask={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.wrapperView}>
          <View style={styles.tabViewStyle}>
            <Pressable
              onPress={() => setActive(true)}
              style={
                active ? styles.activeTabViewStyle : styles.inActiveTabViewStyle
              }
            >
              <Text
                style={
                  active ? styles.activeTextStyle : styles.inActiveTextStyle
                }
              >
                Login
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setActive(false)}
              style={
                active ? styles.inActiveTabViewStyle : styles.activeTabViewStyle
              }
            >
              <Text
                style={
                  active ? styles.inActiveTextStyle : styles.activeTextStyle
                }
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
          {active ? <LoginInputPart /> : <RegisterInputPart />}
        </View>
      </KeyboardAvoidingView>
    </RBSheet>
  );
}

BottomSheet.propTypes = {
  addBottomRef: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.auth, //name of prop = alert
  sheetData: state.sheet,
});

export default connect(mapStateToProps, { addBottomRef, initialSheetOpen })(
  BottomSheet
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapperView: {
    flex: 1,
    alignItems: "center",
  },
  tabViewStyle: {
    height: 50,
    width: "100%",
    flexDirection: "row",
  },
  activeTabViewStyle: {
    height: 50,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderBottomColor: "#ffc416",
    borderBottomWidth: 5,
    borderRightColor: COLORS.textGrey,
    borderRightWidth: 1,
    borderLeftColor: COLORS.textGrey,
    borderLeftWidth: 1,
  },
  inActiveTabViewStyle: {
    height: 50,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  activeTextStyle: {
    color: COLORS.primary,
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
  inActiveTextStyle: {
    color: COLORS.white,
    fontSize: RFValue(12),
  },
});
