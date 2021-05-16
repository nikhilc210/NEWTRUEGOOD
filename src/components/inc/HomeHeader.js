import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { goBack, navigate, openDrawer } from "../../navigations/RootNavigation";

const HomeHeader = ({ title, isHome = true }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.leftPart}>
            {isHome ? (
              <Feather
                name="menu"
                color="white"
                size={20}
                onPress={() => openDrawer()}
              />
            ) : (
              <Feather
                name="chevron-left"
                color="white"
                size={20}
                onPress={() => goBack()}
              />
            )}
          </View>
          <View style={styles.innerPart}>
            {title === "Home" ? (
              <>
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "700" }}
                >
                  Kolkata
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontWeight: "200",
                  }}
                >
                  Kolkata, West Bengal
                </Text>
              </>
            ) : (
              <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
                {title}
              </Text>
            )}
          </View>
          <Pressable
            style={styles.rightPart}
            onPress={() => navigate("AboutUsNavigator")}
          >
            <Image
              source={require("../../assets/images/icons/TRUE_GOOD_LOGO-01.png")}
              style={{ width: 32, height: 32 }}
              resizeMode={"contain"}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "#1CA953",
    width: "100%",
  },
  leftPart: { flex: 1, alignItems: "center", justifyContent: "center" },
  innerPart: { flex: 5, alignItems: "center", justifyContent: "center" },
  rightPart: { flex: 1, alignItems: "center", justifyContent: "center" },
});
