import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screens Imports  &&&  Navigator if they Needed:::
import HomeScren from '../screens/HomeScreens/HomeScreen';
import ProductListScreen from '../screens/ProductScreens/ProductListScreen';
import SingleProductDetailScreen from '../screens/ProductScreens/SingleProductDetailScreen';
import DeliverySlot from '../screens/OrderScreens/DeliverySlot';

const HomeNavigatorOptions = {
  headerShown: false,
};

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScren}
        options={HomeNavigatorOptions}
      />
      <HomeStack.Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={HomeNavigatorOptions}
      />
      <HomeStack.Screen
        name="SingleProductDetailScreen"
        options={HomeNavigatorOptions}>
        {(props) => <SingleProductDetailScreen {...props} />}
      </HomeStack.Screen>

      <HomeStack.Screen
        name="DeliverySlot"
        component={DeliverySlot}
        options={HomeNavigatorOptions}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
