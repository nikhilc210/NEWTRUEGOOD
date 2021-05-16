import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyOrderNavigator from "./my-orders-navigation";
import PastOrderNavigator from "./past-orders-navigation";

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <TopTab.Navigator
      initialRouteName="LIVE ORDERS"
      backBehavior="initialRoute"
    >
      <TopTab.Screen name="LIVE ORDERS" component={MyOrderNavigator} />
      <TopTab.Screen name="PAST ORDERS" component={PastOrderNavigator} />
    </TopTab.Navigator>
  );
};

export default TopTabNavigator;
