import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../constants/theme';
import {useSelector} from 'react-redux';
import {navigate} from '../../../navigations/RootNavigation';

const DeliverySlot = () => {
  const deliverySlot = useSelector((state) => state.deliverySlotReducer);
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigate('DeliverySlot')}>
      <Text
        style={[
          styles.headerText,
          {paddingHorizontal: hp('0%')},
          {color: 'black'},
        ]}>
        Delivery Slot :
      </Text>
      <Text
        style={[
          styles.headerText,
          {
            color: 'black',
            flex: 2,
            fontWeight: '700',
            fontSize: RFValue(12),
            textAlign: 'left',
            paddingLeft: hp(2),
          },
        ]}>
        {deliverySlot.time} {'   '}
        {deliverySlot.date}
      </Text>
      <AntDesign
        name="right"
        color="black"
        size={hp('2%')}
        style={{paddingHorizontal: hp('0.5%'), alignSelf: 'flex-end'}}
      />
    </Pressable>
  );
};
export default DeliverySlot;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: hp('2%'),
    paddingHorizontal: hp('2%'),
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: COLORS.white,
  },
});
