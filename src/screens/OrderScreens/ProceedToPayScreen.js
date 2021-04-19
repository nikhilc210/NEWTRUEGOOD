import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import DeliveryAddressView from '../../components/organisms/cartscreen/DeliveryAddressView';
import CategoryHeader from '../../components/inc/CategoryHeader';
import ProceedToPayView from '../../components/organisms/cartscreen/ProceedToPayView';
import ApplyCoupon from '../../components/organisms/orderscreen/ApplyCoupon';
import DeliverySlot from '../../components/organisms/homescreen/DeliverySlot';

//React Native Paper
import {RadioButton} from 'react-native-paper';
import {COLORS} from '../../constants/theme';

const ProceedToPayScreen = () => {
  const [value, setValue] = useState('online');
  return (
    <View style={styles.container}>
      <CategoryHeader isSearch={true} />
      <DeliverySlot />
      <ApplyCoupon />
      <DeliveryAddressView />
      <RadioButton.Group
        onValueChange={(newValue) => setValue(newValue)}
        value={value}>
        {/*Online payment Radio Button*/}
        <RadioButton.Item
          label="Online Payment"
          value="online"
          color={COLORS.primary}
        />
        {/*Cash on delivery Radio Button*/}
        <RadioButton.Item
          label="Cash on Delivery"
          value="cod"
          color={COLORS.primary}
        />
        {/*Cash on delivery Radio Button*/}
      </RadioButton.Group>
      <ProceedToPayView mode={value} />
    </View>
  );
};
export default ProceedToPayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
