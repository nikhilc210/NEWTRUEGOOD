import React from "react";
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

//Theme Imports
import { COLORS } from "../../constants/theme";

//components Imports
import HomeHeader from "../../components/inc/HomeHeader";
import DealBanner from "../../components/organisms/homescreen/DealBanner";
import ShopByCategoryView from "../../components/organisms/homescreen/ShopByCategoryView";
import BottomSheet from "../AuthScreens/BottomSheet";
import DeliverySlot from "../../components/organisms/homescreen/DeliverySlot";
import ThinBanner from "../../components/organisms/homescreen/ThinBanner";
import OzoneBanner from "../../components/organisms/homescreen/OzoneBanner";
import ExoticBanner from "../../components/organisms/homescreen/Exoticbanner";
import InformativeBanner from "../../components/organisms/homescreen/InformativeBanner";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Informative from "../../components/organisms/homescreen/Informative";
import MobileBottomSheet from "../AuthScreens/MobileBottomSheet";
import LoginOTPSheet from "../AuthScreens/LoginOTPSheet";
import SearchViewHome from "../../components/organisms/homescreen/SearchViewHome";
import RegisterOTPSheet from "../AuthScreens/RegisterOTPSheet";
import RegisterSheet from "../AuthScreens/RegisterSheet";
import MainOfferView from "../../components/organisms/homescreen/MainOfferView";
import { useFocusEffect } from "@react-navigation/core";
import RecommendedProducts from "../../components/organisms/RecommendedProducts";
import BestSellerProducts from "../../components/organisms/BestSellerProducts";

function HomeScren() {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit app?", [
          { text: "Cancel", onPress: () => null, style: "cancel" },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        <HomeHeader title="Home" />
        <SearchViewHome />
        <DeliverySlot />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <ThinBanner />
          <ShopByCategoryView />
          <OzoneBanner />
          <MainOfferView />
          <ExoticBanner />
          <RecommendedProducts />
          <DealBanner />
          <BestSellerProducts />
          <Informative />
          <ShopByCategoryView />
          {/* <InformativeBanner /> */}
        </ScrollView>
      </View>
      <Pressable
        onPress={() => {
          Linking.openURL(`whatsapp://send?phone=+917605013511`);
        }}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: 10,
          backgroundColor: COLORS.primary,
          flexDirection: "row",
        }}
      >
        <MaterialCommunityIcons name={"whatsapp"} size={20} color={"white"} />
        <Text style={{ color: "white", marginLeft: 6 }}>Chat with Us</Text>
      </Pressable>
      <RegisterSheet />
      <BottomSheet />
      <MobileBottomSheet />
      <LoginOTPSheet />
      <RegisterOTPSheet />
    </>
  );
}

export default HomeScren;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    backgroundColor: "#f8f9fa",
  },
});
