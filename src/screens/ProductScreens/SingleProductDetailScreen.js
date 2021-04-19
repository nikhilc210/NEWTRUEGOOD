import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import CategoryHeader from "../../components/inc/CategoryHeader";
import { ScrollView } from "react-native-gesture-handler";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import FontAwesome from "react-native-vector-icons/FontAwesome";
//
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS } from "../../constants/theme";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProductById } from "../../redux/actions/product";
import {
  addToCart,
  decQuantity,
  incQuantity,
  removeItem,
} from "../../redux/actions/cart";

import ProductLoader from "../../components/inc/ProductLoader";

import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

import Toast from "react-native-simple-toast";

const SingleProductDetailScreen = ({
  route,
  getProductById,
  productData: {
    product: {
      _id,
      id_ODDO,
      name,
      price,
      image_URL,
      discount,
      weight,
      description,
      item_stock,
      ratings = [],
    },
    singleProductLoading,
  },
  addToCart,
  incQuantity,
  decQuantity,
  removeItem,
  cartData: { items },
}) => {
  useEffect(() => {
    const getData = async () => {
      const { productId } = await route.params;
      await getProductById(productId);
    };
    getData();
  }, []);

  let newPrice = Math.round(price - (discount / 100) * price);

  const qty = items.find((item) => item.id === _id)
    ? items.find((item) => item.id === _id).quantity
    : 0;

  const addToCartFunction = () => {
    let productDetails = {
      id: _id,
      id_ODDO,
      name,
      price: newPrice,
      image: image_URL,
      discount,
      weight,
      quantity: 1,
      item_stock,
      tax_id: "",
    };

    if (qty >= 99 || qty >= item_stock) {
      Toast.show(
        `Maximum Order Limit for this product is ${item_stock}.You cannot add more!`,
        Toast.SHORT
      );
    } else {
      addToCart(productDetails);
    }
  };

  const increaseCart = () => {
    if (qty >= 99 || qty >= item_stock) {
      Toast.show(
        `Maximum Order Limit for this product is ${item_stock}.You cannot add more!`,
        Toast.SHORT
      );
    } else {
      incQuantity(_id);
    }
  };

  const decreaseCart = () => {
    if (qty === 1) {
      removeItem(_id);
    } else {
      decQuantity(_id);
    }
  };

  return (
    <View style={styles.container}>
      <CategoryHeader />
      {singleProductLoading ? (
        <ProductLoader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={{ uri: image_URL }}
            style={styles.productImageStyle}
            resizeMode="contain"
          />
          <View style={{ padding: hp("2%") }}>
            <View style={styles.productDetailViewStyle}>
              <View>
                <Text style={styles.productNameTextStyle}>{name}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.priceTextStyle}>₹ {newPrice}</Text>
                  <Text style={styles.discountPriceTextStyle}>{price}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: hp("2%") }}>
                {qty > 0 ? (
                  <View style={styles.addedContainer}>
                    <Pressable
                      style={{ paddingHorizontal: wp("1.5%") }}
                      onPress={() => decreaseCart()}
                    >
                      <AntDesign
                        name="minus"
                        color={COLORS.primary}
                        size={hp("3%")}
                      />
                    </Pressable>
                    <View style={styles.backgroundStyle}>
                      <Text style={styles.qtyTextStyle}>{qty}</Text>
                    </View>
                    <Pressable
                      style={{ paddingHorizontal: wp("1.5%") }}
                      onPress={() => increaseCart()}
                    >
                      <Entypo
                        name="plus"
                        color={COLORS.primary}
                        size={hp("3%")}
                      />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      if (item_stock === 0) {
                        Toast.show(`Product out of stock`, Toast.SHORT);
                      } else {
                        addToCartFunction();
                      }
                    }}
                    style={styles.addContainer}
                  >
                    <Text style={styles.addTextStyle}>ADD</Text>
                  </Pressable>
                )}
              </View>
            </View>
            <Text style={styles.AddressTitle}>About Product</Text>
            <Text style={styles.AddressDetail}>{description}</Text>
            <Text
              style={[
                styles.AddressTitle,
                {
                  marginTop: hp(2),
                  borderTopWidth: 1,
                  borderTopColor: COLORS.textGrey,
                },
              ]}
            >
              Rating
            </Text>
            {ratings.map((singleRating, index) => {
              return (
                <View key={index} style={{ flexDirection: "row" }}>
                  <View style={styles.ratingView}>
                    <Text
                      style={[
                        styles.ratingNumberTextStyle,
                        {
                          fontSize: RFValue(12),
                        },
                      ]}
                    >
                      {singleRating?.star}
                    </Text>
                    <View style={{ paddingTop: hp(0.5), paddingRight: hp(1) }}>
                      <FontAwesome
                        name="star"
                        color={COLORS.primary}
                        size={hp("2.0%")}
                      />
                    </View>
                    <Text style={[styles.AddressDetail, { color: "black" }]}>
                      {singleRating?.message}
                    </Text>
                  </View>
                </View>
              );
            })}
            {/*<View style={{flexDirection: 'row'}}>*/}
            {/*  <View style={styles.ratingView}>*/}
            {/*    <Text*/}
            {/*      style={[*/}
            {/*        styles.ratingNumberTextStyle,*/}
            {/*        {*/}
            {/*          fontSize: RFValue(12),*/}
            {/*        },*/}
            {/*      ]}>*/}
            {/*      4.1*/}
            {/*    </Text>*/}
            {/*    <View style={{paddingTop: hp(0.5), paddingRight: hp(1)}}>*/}
            {/*      <FontAwesome*/}
            {/*        name="star"*/}
            {/*        color={COLORS.primary}*/}
            {/*        size={hp('2.0%')}*/}
            {/*      />*/}
            {/*    </View>*/}
            {/*    <Text style={[styles.AddressDetail, {color: 'black'}]}>*/}
            {/*      This product is very good Please Buy it*/}
            {/*    </Text>*/}
            {/*  </View>*/}
            {/*</View>*/}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

SingleProductDetailScreen.propTypes = {
  getProductById: PropTypes.func.isRequired,
  cartData: PropTypes.object.isRequired,
  productData: PropTypes.object,
  addToCart: PropTypes.func.isRequired,
  incQuantity: PropTypes.func.isRequired,
  decQuantity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cartData: state.cart, //name of prop = alert
  productData: state.product,
});

export default connect(mapStateToProps, {
  getProductById,
  addToCart,
  incQuantity,
  decQuantity,
  removeItem,
})(SingleProductDetailScreen);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  productImageStyle: { width: "100%", height: hp("20%") },
  productDetailViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productNameTextStyle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.primaryFONT,
    color: COLORS.black,
    fontWeight: "400",
    maxWidth: "80%",
  },
  weightTextStyle: {
    fontSize: RFValue(20),
    color: "#818596",
    marginTop: hp("1%"),
  },
  priceView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("1%"),
  },
  priceTextStyle: {
    fontSize: RFValue(14),
    color: COLORS.black,
    fontWeight: "bold",
  },
  discountPriceTextStyle: {
    fontSize: RFValue(14),
    color: COLORS.textGrey,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    marginLeft: hp("1%"),
  },
  ratingView: { flexDirection: "row", marginTop: hp("2%") },
  ratingNumberTextStyle: {
    fontSize: RFValue(14),
    color: "#818596",
    marginRight: hp("1%"),
  },
  buttonTextStyle: {
    fontSize: RFValue(16),
    color: COLORS.white,
    fontFamily: FONTS.primaryFONT,
    textAlignVertical: "top",
  },
  buttonContainer: {
    padding: hp("2%"),
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: COLORS.primary,
  },
  AddressTitle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.primaryFONT,
    color: COLORS.black,
    fontWeight: "700",
    paddingTop: hp("1.5%"),
  },
  addButtonStyle: {
    padding: hp("2%"),
    backgroundColor: COLORS.primary,
    borderRadius: hp("1%"),
  },
  addContainer: {
    paddingVertical: hp("1.0%"),
    paddingHorizontal: wp("10%"),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: hp("0.5%"),
    backgroundColor: COLORS.primary,
    elevation: 1,
  },
  addTextStyle: {
    fontSize: RFValue(14),
    color: COLORS.white,
    fontFamily: FONTS.primaryFONT,
  },
  addedContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: hp("0.5%"),
    elevation: 1,
    backgroundColor: "white",
  },
  backgroundStyle: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.9%"),
  },
  qtyTextStyle: {
    fontSize: RFValue(14),
    color: COLORS.white,
    fontFamily: FONTS.primaryFONT,
  },
});
