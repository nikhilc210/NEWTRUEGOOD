import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CategoryList from '../screens/HomeScreens/CategoryList';

const CategoryNavigatorOptions = {
  headerShown: false,
};

const CategoryStack = createStackNavigator();

const CategoryNavigator = () => {
  return (
    <CategoryStack.Navigator initialRouteName="CategoryScreen">
      <CategoryStack.Screen
        name="CategoryScreen"
        component={CategoryList}
        options={CategoryNavigatorOptions}
      />
    </CategoryStack.Navigator>
  );
};
export default CategoryNavigator;
