import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CartScreen from "../screens/HomeScreens/Cart";
import DeliverySlot from "../screens/OrderScreens/DeliverySlot";
import ProceedToPayScreen from "../screens/OrderScreens/ProceedToPayScreen";

import PaymentScreen from "../screens/DrawerScreens/PaymentScreen";
import SingleProductDetailScreen from "../screens/ProductScreens/SingleProductDetailScreen";

const CartNavigatorOptions = {
  headerShown: false,
};

const CartStack = createStackNavigator();

const CartNavigator = () => {
  return (
    <CartStack.Navigator initialRouteName="CartScreen">
      <CartStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={CartNavigatorOptions}
      />
      <CartStack.Screen
        name="DeliverySlot"
        component={DeliverySlot}
        options={CartNavigatorOptions}
      />
      <CartStack.Screen
        name="ProceedToPay"
        component={ProceedToPayScreen}
        options={CartNavigatorOptions}
      />
      <CartStack.Screen
        name="PaymentNavigator"
        component={PaymentScreen}
        options={CartNavigatorOptions}
      />

      <CartStack.Screen
        name="SingleProductDetailScreen"
        options={CartNavigatorOptions}
      >
        {(props) => <SingleProductDetailScreen {...props} />}
      </CartStack.Screen>
    </CartStack.Navigator>
  );
};
export default CartNavigator;
