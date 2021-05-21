import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";

//Required Imports
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
//Import Themes
import { COLORS, FONTS } from "../../constants/theme";
import { RFValue } from "react-native-responsive-fontsize";
import RBSheet from "react-native-raw-bottom-sheet";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRegisterSheetRef } from "../../redux/actions/sheet";
import RegisterSheetInputPart from "../../components/organisms/authscreen/RegisterSheetInputPart";

const windowWidth = Dimensions.get("window").width;

function RegisterSheetRef({ addRegisterSheetRef }) {
  const rbSheet = useRef(null);
  useEffect(() => {
    addRegisterSheetRef(rbSheet);
  }, []);
  return (
    <RBSheet
      ref={rbSheet}
      closeOnDragDown={true}
      height={hp(60)}
      customStyles={{
        container: {
          justifyContent: "center",
          alignItems: "center",
        },
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.signInTextStyle}>We want to know you more</Text>
          </View>

          <RegisterSheetInputPart />
        </View>
      </KeyboardAvoidingView>
    </RBSheet>
  );
}

RegisterSheetRef.propTypes = {
  addRegisterSheetRef: PropTypes.func.isRequired,
};

export default connect(null, { addRegisterSheetRef })(RegisterSheetRef);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white",
    backgroundColor: "white",
    justifyContent: "center",
  },

  signInTextStyle: {
    fontSize: RFValue(16),
    color: COLORS.black,
    fontWeight: "bold",
    fontFamily: FONTS.primaryFONT,
  },
  signInTextDesStyle: {
    fontSize: RFValue(15),
    color: COLORS.black,
    fontWeight: "700",
    fontFamily: FONTS.primaryFONT,
  },
  captionTextStyle: {
    fontSize: RFValue(12),
    fontFamily: FONTS.primaryFONT,
  },
  loginButtonStyle: {
    height: hp("6%"),
    width: windowWidth - 40,
    borderRadius: hp("0.8%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    elevation: 5,
    marginTop: hp("4%"),
  },
  loginTextStyle: {
    fontSize: RFValue(12),
    color: COLORS.white,
    fontFamily: FONTS.primaryFONT,
  },
});
