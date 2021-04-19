import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Screens::
import SplashScreen from '../screens/InitialScreens/SplashScreen';
import DrawerNavigator from './drawer-navigation';
import SuccessPage from '../screens/SuccessPage';
import FailurePage from '../screens/FailurePage';
import {SafeAreaView, View, Platform} from 'react-native';
import {COLORS} from '../constants/theme';

//Import NavigationService

const AppNavigatorOptions = {
  headerShown: false,
};

const StackApp = createStackNavigator();

class AppNavigator extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
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
  }
}

export default AppNavigator;
