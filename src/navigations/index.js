import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//Screens::
import SplashScreen from "../screens/InitialScreens/SplashScreen";
import DrawerNavigator from "./drawer-navigation";
import SuccessPage from "../screens/SuccessPage";
import FailurePage from "../screens/FailurePage";
import { SafeAreaView } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import NoInternet from "../components/inc/NoInternet";
//Import NavigationService

const AppNavigatorOptions = {
  headerShown: false,
};

const StackApp = createStackNavigator();

const AppNavigator = () => {
  const netInfo = useNetInfo();

  if (!(netInfo.isConnected && netInfo.isInternetReachable)) {
    return <NoInternet />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StackApp.Navigator initialRouteName="SplashScreen">
        <StackApp.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={AppNavigatorOptions}
        />
        <StackApp.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={AppNavigatorOptions}
        />
        <StackApp.Screen
          name="SuccessPage"
          component={SuccessPage}
          options={AppNavigatorOptions}
        />
        <StackApp.Screen
          name="FailurePage"
          component={FailurePage}
          options={AppNavigatorOptions}
        />
      </StackApp.Navigator>
    </SafeAreaView>
  );
};
export default AppNavigator;
