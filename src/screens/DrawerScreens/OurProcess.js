import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BackHeader from "../../components/inc/BackHeader";

//images imports
import {
  process1,
  process2,
  process3,
  process4,
  process5,
  process6,
  process7,
} from "../../constants/images";

import AntDesign from "react-native-vector-icons/AntDesign";

const OurProcess = () => {
  return (
    <View style={styles.container}>
      <BackHeader title="Our Process" />
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Image source={process1} style={styles.imageStyle} />
        <AntDesign name="arrowdown" size={40} color="black" />
        <Image source={process2} style={styles.imageStyle} />
        <AntDesign name="arrowdown" size={40} color="black" />
        <Image source={process3} style={styles.imageStyle} />
        <AntDesign name="arrowdown" size={40} color="black" />
        <Image source={process4} style={styles.imageStyle} />
        <AntDesign name="arrowdown" size={40} color="black" />
        <Image source={process5} style={styles.imageStyle} />
        <AntDesign name="arrowdown" size={40} color="black" />
        <Image source={process6} style={styles.imageStyle} />
        <AntDesign name="arrowdown" size={40} color="black" />
        <Image source={process7} style={styles.imageStyle} />
      </ScrollView>
    </View>
  );
};
export default OurProcess;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  imageStyle: { width: "100%", height: 200, resizeMode: "contain" },
});
