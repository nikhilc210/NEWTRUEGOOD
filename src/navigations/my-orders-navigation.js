import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screens Imports  &&&  Navigator if they Needed:::
import LiveOrderListScreen from '../screens/OrderScreens/LiveOrderListScreen';
import OrderDetailScreen from '../screens/OrderScreens/OrderDetailScreen';

const MyOrderNavigatorOptions = {
  headerShown: false,
};

const MyOrderStack = createStackNavigator();

const MyOrderNavigator = () => {
  return (
    <MyOrderStack.Navigator initialRouteName="LiveOrderListScreen">
      <MyOrderStack.Screen
        name="LiveOrderListScreen"
        component={LiveOrderListScreen}
        options={MyOrderNavigatorOptions}
      />
      <MyOrderStack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
        options={MyOrderNavigatorOptions}
      />
    </MyOrderStack.Navigator>
  );
};
export default MyOrderNavigator;
