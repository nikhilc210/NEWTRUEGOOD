import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DeliverySlotTiming from '../screens/OrderScreens/DeliverySlotTiming';
import moment from 'moment';

var dates = [];
var timeFrom = (X) => {
  for (let I = 0; I < Math.abs(X); I++) {
    dates.push(
      new Date(
        new Date().getTime() - (X >= 0 ? I : I - I - I) * 24 * 60 * 60 * 1000,
      ),
    );
  }
  return dates;
};
timeFrom(-7);

const DeliverySlotTopTab = createMaterialTopTabNavigator();

const DeliverySlotTopTabNavigator = () => {
  return (
    <DeliverySlotTopTab.Navigator
      initialRouteName="Today"
      backBehavior="true"
      swipeEnabled="true"
      tabBarOptions={{
        scrollEnabled: true,
      }}>
      <DeliverySlotTopTab.Screen
        name="Today"
        children={() => (
          <DeliverySlotTiming date={moment(dates[0]).format('MMM DD')} />
        )}
      />
      <DeliverySlotTopTab.Screen
        name={`Tomorrow ${moment(dates[1]).format('MMM DD')}`}
        children={() => (
          <DeliverySlotTiming date={moment(dates[1]).format('MMM DD')} />
        )}
      />
      <DeliverySlotTopTab.Screen
        name={`${moment(dates[2]).format('MMM DD')}`}
        children={() => (
          <DeliverySlotTiming date={moment(dates[2]).format('MMM DD')} />
        )}
      />
      <DeliverySlotTopTab.Screen
        name={`${moment(dates[3]).format('MMM DD')}`}
        children={() => (
          <DeliverySlotTiming date={moment(dates[3]).format('MMM DD')} />
        )}
      />
      <DeliverySlotTopTab.Screen
        name={`${moment(dates[4]).format('MMM DD')}`}
        children={() => (
          <DeliverySlotTiming date={moment(dates[4]).format('MMM DD')} />
        )}
      />
      <DeliverySlotTopTab.Screen
        name={`${moment(dates[5]).format('MMM DD')}`}
        children={() => (
          <DeliverySlotTiming date={moment(dates[5]).format('MMM DD')} />
        )}
      />
    </DeliverySlotTopTab.Navigator>
  );
};

export default DeliverySlotTopTabNavigator;
