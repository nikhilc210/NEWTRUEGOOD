import React from 'react';
import {View, Text, StyleSheet,Dimensions} from 'react-native';
import BackHeader from '../../components/inc/BackHeader';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS} from '../../constants/theme';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const InviteFriend = () => {
  return (
    <View style={styles.container}>
      <BackHeader title="Invite Your Friend" />

      <View style={{padding: hp('2.5%')}}>
        <Text style={styles.inviteTitle}>
          Invite Friend and Family and earn Rs 200!
        </Text>
        <Text style={styles.inviteDescription}>
          Tell a Friend they get Rs. 200 discount on min order value of 500. You
          get Rs 200 Maamsa cash.
        </Text>

        <View
          style={{
            height: hp(30),
            width: Dimensions.get("window").width * 0.90,
            borderStyle: 'dashed',
            borderRadius: 1,
            borderWidth: 1,
            borderColor: 'black',
            marginTop: hp('5%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: RFValue(24),
              fontFamily: FONTS.primaryFONT,
              color: COLORS.black,
              fontWeight: '700',
            }}>
            KXGFYV
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: '8.0%',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.buttoncontainer}>
            <FontAwesome
              name="copy"
              color={COLORS.primary}
              size={hp('3%')}
              style={{paddingRight: hp('1.0%')}}
            />
            <Text style={styles.textStyle}>COPY CODE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttoncontainer}>
            <FontAwesome
              name="share"
              color={COLORS.primary}
              size={hp('3%')}
              style={{paddingRight: hp('1.0%')}}
            />
            <Text style={styles.textStyle}>SHARE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default InviteFriend;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center',backgroundColor:"#ffffff"},
  buttoncontainer: {
    padding: hp('2%'),
    borderColor: COLORS.black,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
      width:Dimensions.get("window").width * 0.40

  },
  textStyle: {
    fontSize: RFValue(12),
    color: COLORS.black,
    fontFamily: FONTS.primaryFONT,
    fontWeight: 'bold',
  },
  inviteTitle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.primaryFONT,
    color: COLORS.black,
    fontWeight: '700',

  },
  inviteDescription: {
    fontSize: RFValue(12),
    fontFamily: FONTS.primaryFONT,
    color: COLORS.black,
    fontWeight: '100',
    paddingTop: hp('2.5%'),

  },
});
