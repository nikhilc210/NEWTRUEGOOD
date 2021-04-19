import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeNavigator from "./home-navigation";
import OffersScreen from "../screens/HomeScreens/Offers";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Image } from "react-native";
import CartNumber from "../components/atoms/CartNumber";
import CartNavigator from "./cart-navigation";
import SearchNavigator from "./search-navigation";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "Home") {
            return (
              <Image
                source={require("../assets/images/icons/true-good-leaf-icon.png")}
                style={{ width: size, height: size }}
                resizeMode={"contain"}
              />
            );
          } else if (route.name === "Categories") {
            return (
              <MaterialCommunityIcons
                name={"view-dashboard-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Search") {
            return <MaterialIcons name={"search"} size={size} color={color} />;
          } else if (route.name === "Offers") {
            if (focused) {
              return (
                <Image
                  source={require("../assets/images/offer2.png")}
                  style={{ width: size, height: size }}
                  resizeMode={"contain"}
                />
              );
            } else {
              return (
                <Image
                  source={require("../assets/images/offer.png")}
                  style={{ width: size, height: size }}
                  resizeMode={"contain"}
                />
              );
            }
          } else if (route.name === "Cart") {
            return <CartNumber size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "#1CA953",
        inactiveTintColor: "#6b6b6b",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{ unmountOnBlur: true }}
      />
      {/* <Tab.Screen
        name="Categories"
        component={CategoryList}
        options={{unmountOnBlur: true}}
      /> */}
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Offers"
        component={OffersScreen}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
