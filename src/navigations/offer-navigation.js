import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OffersScreen from "../screens/HomeScreens/Offers";
import SingleProductDetailScreen from "../screens/ProductScreens/SingleProductDetailScreen";

const navigatorOptions = {
  headerShown: false,
};

const Stack = createStackNavigator();

const OfferNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OfferScreen">
      <Stack.Screen
        name="OfferScreen"
        component={OffersScreen}
        options={navigatorOptions}
      />

      <Stack.Screen
        name="SingleProductDetailScreen"
        options={navigatorOptions}
        component={SingleProductDetailScreen}
      />
    </Stack.Navigator>
  );
};
export default OfferNavigator;
