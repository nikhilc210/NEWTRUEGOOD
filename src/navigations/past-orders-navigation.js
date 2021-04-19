import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screens Imports  &&&  Navigator if they Needed:::
import AddReviewScreen from '../screens/OrderScreens/AddReviewScreen';
import PastOrderListScreen from '../screens/OrderScreens/PastOrderListScreen';
import PastOrderDetailScreen from '../screens/OrderScreens/PastOrderDetailScreen';

const MyOrderNavigatorOptions = {
  headerShown: false,
};

const MyOrderStack = createStackNavigator();

const PastOrderNavigator = () => {
  return (
    <MyOrderStack.Navigator initialRouteName="PastOrderListScreen">
      <MyOrderStack.Screen
        name="PastOrderListScreen"
        component={PastOrderListScreen}
        options={MyOrderNavigatorOptions}
      />
      <MyOrderStack.Screen
        name="AddReviewScreen"
        component={AddReviewScreen}
        options={MyOrderNavigatorOptions}
      />
      <MyOrderStack.Screen
        name="PastDetailScreen"
        component={PastOrderDetailScreen}
        options={MyOrderNavigatorOptions}
      />
    </MyOrderStack.Navigator>
  );
};
export default PastOrderNavigator;
