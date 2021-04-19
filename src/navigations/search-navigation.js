import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreens/SearchScreen";
import SingleProductDetailScreen from "../screens/ProductScreens/SingleProductDetailScreen";

const SearchNavigatorOptions = {
  headerShown: false,
};

const CategoryStack = createStackNavigator();

const SearchNavigator = () => {
  return (
    <CategoryStack.Navigator initialRouteName="SearchScreen">
      <CategoryStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={SearchNavigatorOptions}
      />

      <CategoryStack.Screen
        name="SingleProductDetailScreen"
        options={SearchNavigatorOptions}
      >
        {(props) => <SingleProductDetailScreen {...props} />}
      </CategoryStack.Screen>
    </CategoryStack.Navigator>
  );
};
export default SearchNavigator;
