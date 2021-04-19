import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONTS} from '../../constants/theme';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

//Ratings::
import StarRating from 'react-native-star-rating';

//Redux Imports
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addProductRating} from '../../redux/actions/product';
import {ActivityIndicator} from 'react-native-paper';

const AddReviewScreen = ({
  addProductRating,
  productData: {addRatingLoading},
  route,
}) => {
  const [starCount, setStarCount] = useState(0);
  const [message, setMessage] = useState('');

  const {productId} = route.params;

  const submitReview = () => {
    const sendData = {
      productId: productId,
      star: starCount,
      message,
    };

    addProductRating(sendData);
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.textStyle, {color: COLORS.black}]}>Rating</Text>
        <StarRating
          disabled={false}
          containerStyle={{marginTop: hp('1%')}}
          maxStars={5}
          fullStarColor={'orange'}
          starSize={hp('4%')}
          rating={starCount}
          selectedStar={(rating) => setStarCount(rating)}
        />
        <View>
          <Text
            style={[
              styles.textStyle,
              {color: COLORS.black, marginBottom: hp(4), marginTop: hp(2)},
            ]}>
            Your Review
          </Text>
        </View>
        <TextInput
          style={[styles.textInput]}
          textAlignVertical={'top'}
          multiline={true}
          placeholder="Write a review"
          onChangeText={(text) => setMessage(text)}
        />
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={submitReview}>
            {addRatingLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.textStyle}>SUBMIT MY REVIEW</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

AddReviewScreen.propTypes = {
  addProductRating: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  productData: state.product, //name of prop = alert
});

export default connect(mapStateToProps, {
  addProductRating,
})(AddReviewScreen);

const styles = StyleSheet.create({
  container: {flex: 1, padding: hp('2%'), backgroundColor: '#fff'},
  textStyle: {
    fontSize: RFValue(13),
    color: COLORS.white,
    fontFamily: FONTS.primaryFONT,
    fontWeight: 'bold',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    padding: hp('1.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    margin: hp('2%'),
  },
  textInput: {
    height: hp('20%'),
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: hp('0.5%'),
  },
});
