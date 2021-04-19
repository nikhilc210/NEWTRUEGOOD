import React from 'react';
import {Text, StyleSheet, Dimensions, ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import SELECT_SLOT from '../../redux/actions/DelieverySlotActions';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-simple-toast'

let currentDate = moment(new Date()).format('MMM DD');
let checkStartTime, checkEndTime;

const DeliverySlotButton = (props) => {
  const deliveryTime = useSelector((state) => state.deliverySlotReducer);
  const dispatch = useDispatch();

  const addDelieverySlot = (item) => {
    let splitvalue = item.time;
    let splitvalue1 = splitvalue.split('-');
    checkEndTime = splitvalue1[1];
    checkEndTime = checkEndTime.split(' ')[0];

    let date = new Date();
    let hours = date.getHours();

    if (currentDate === item.date) {
      let TimeBool = checkEndTime > hours + 7;
      //TODO:: check if the hr is more than 7 of current??
      if (TimeBool === true) {
        dispatch({type: SELECT_SLOT, payload: item});

        alert('The delivery slot has been selected');
      } else {
        
        Toast.show('Please select the next available delivery time slot', Toast.SHORT);
      }
    } else {
      dispatch({type: SELECT_SLOT, payload: item});
      alert('The delivery slot has been selected');
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            deliveryTime.time === props.time && deliveryTime.date === props.date
              ? COLORS.primary
              : 'white',
          borderColor:
            deliveryTime.time === props.time && deliveryTime.date === props.date
              ? COLORS.primary
              : props.color,
        },
      ]}
      onPress={() => {
        addDelieverySlot({
          date: props.date,
          time: props.time,
        });
      }}>
      <Text
        style={[
          styles.textStyle,
          {
            color:
              deliveryTime.time === props.time &&
              deliveryTime.date === props.date
                ? 'white'
                : props.color,
          },
        ]}>
        {props.time}
      </Text>
    </TouchableOpacity>
  );
};
export default DeliverySlotButton;

const styles = StyleSheet.create({
  container: {
    padding: hp('1.5%'),
    borderWidth: 1.5,
    width: Dimensions.get('window').width * 0.4,
    marginVertical: hp(1.5),
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: RFValue(12),
    color: '#818596',
    fontFamily: FONTS.primaryFONT,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
