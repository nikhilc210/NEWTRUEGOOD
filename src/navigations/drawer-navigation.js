import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

//Navigator Import
import TabNavigator from './tab-navigation';
import CustomDrawer from '../components/inc/CustomDrawer';
import MyOrderScreen from '../screens/OrderScreens/MyOrderScreen';
import DeliveryScreen from '../screens/DrawerScreens/DeliveryScreen';
import InviteFriend from '../screens/DrawerScreens/InviteFriend';
import ContactUsScreen from '../screens/DrawerScreens/ContactUsScreen';
import TermsScreen from '../screens/DrawerScreens/TermsScreen';
import FAQScreen from '../screens/DrawerScreens/FAQScreen';
import AboutUsScreen from '../screens/DrawerScreens/AboutUsScreen';
import NotificationScreen from '../screens/DrawerScreens/NotificationScreen';
import ProfileScreen from '../screens/DrawerScreens/ProfileScreen';
import OTPVerifyScreen from '../screens/DrawerScreens/OTPVerifyScreen';
import OurProcess from '../screens/DrawerScreens/OurProcess';
//
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="TabNavigator"
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
      <Drawer.Screen
        name="NotificationNavigator"
        component={NotificationScreen}
      />
      <Drawer.Screen name="ProfileNavigator" component={ProfileScreen} />
      <Drawer.Screen name="OTPNavigator" component={OTPVerifyScreen} />
      <Drawer.Screen name="AboutUsNavigator" component={AboutUsScreen} />
      <Drawer.Screen name="OurProcessNavigator" component={OurProcess} />
      <Drawer.Screen name="MyOrderNavigator" component={MyOrderScreen} />
      <Drawer.Screen name="DeliveryNavigator" component={DeliveryScreen} />
      <Drawer.Screen name="InviteFriendNavigator" component={InviteFriend} />
      <Drawer.Screen name="ContactUsNavigator" component={ContactUsScreen} />
      <Drawer.Screen name="TermsNavigator" component={TermsScreen} />
      <Drawer.Screen name="FAQsNavigator" component={FAQScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
