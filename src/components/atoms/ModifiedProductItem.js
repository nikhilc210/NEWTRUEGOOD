import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLORS, FONTS } from "../../constants/theme";

import { RFValue } from "react-native-responsive-fontsize";
import AntDesign from "react-native-vector-icons/AntDesign";
import { navigate } from "../../navigations/RootNavigation";
import Entypo from "react-native-vector-icons/Entypo";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addToCart,
  decQuantity,
  incQuantity,
  removeItem,
} from "../../redux/actions/cart";
import { setProduct } from "../../redux/actions/product";
import Toast from "react-native-simple-toast";

function ModifiedProductItem({
  item: {
    _id,
    id_ODDO,
    name,
    price,
    image_URL,
    discount,
    weight,
    isOffer,
    offer_price,
    item_stock,
  },
  addToCart,
  incQuantity,
  decQuantity,
  removeItem,
  setProduct,
  cartData: { items },
}) {
  let newPrice = isOffer
    ? offer_price
    : Math.round(price - (discount / 100) * price);

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
    addToCart(productDetails);
  };

  const increaseCart = () => {
    if (qty === 0 || qty >= 99 || qty >= item_stock) {
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

  const goToSingleScreen = async () => {
    let productDetails = {
      _id,
      name,
      price,
      image_URL,
      discount,
      weight,
    };
    await setProduct(productDetails);
    navigate("SingleProductDetailScreen", { productId: _id });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToSingleScreen}>
        <View
          style={{
            flex: 2,
          }}
        >
          <View>
            {discount && (
              <View style={styles.offerViewStyle}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: RFValue(10),
                  }}
                >
                  {isOffer ? "Offer Price" : `${discount} % Off`}
                </Text>
              </View>
            )}

            <Image
              source={{ uri: image_URL }}
              style={styles.productImageStyle}
              resizeMode="contain"
            />
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 3,
        }}
      >
        <TouchableOpacity onPress={goToSingleScreen}>
          <Text style={styles.productNameTextStyle} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.weightTextStyle} numberOfLines={1}>
            {weight}
          </Text>
          <View style={styles.wrapperViewStyle}>
            <View style={styles.priceView}>
              <Text style={styles.priceTextStyle}>₹ {newPrice}</Text>
              <Text style={styles.discountPriceTextStyle}>₹ {price}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            alignContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          {qty > 0 ? (
            <View style={styles.addedContainer}>
              <Pressable
                style={{ paddingHorizontal: wp("1.5%") }}
                onPress={() => decreaseCart()}
              >
                <AntDesign name="minus" color={COLORS.primary} />
              </Pressable>
              <View style={styles.backgroundStyle}>
                <Text style={styles.qtyTextStyle}>{qty}</Text>
              </View>
              <Pressable
                style={{ paddingHorizontal: wp("1.5%") }}
                onPress={() => increaseCart()}
              >
                <Entypo name="plus" color={COLORS.primary} />
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={() => {
                // Toast.show(` ${item_stock}`, Toast.SHORT);
                if (item_stock === 0) {
                  Toast.show(`Sold Out`, Toast.SHORT);
                } else {
                  addToCartFunction();
                }
              }}
            >
              {(() => {
                if (item_stock === 0) {
                  return (
                    <View style={styles.outofStock}>
                      <Text style={styles.addTextStyle}>Sold Out</Text>
                    </View>
                  );
                }

                return (
                  <View style={styles.addContainer}>
                    <Text style={styles.addTextStyle}>ADD</Text>
                  </View>
                );
              })()}
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

ModifiedProductItem.propTypes = {
  addToCart: PropTypes.func.isRequired,
  incQuantity: PropTypes.func.isRequired,
  decQuantity: PropTypes.func.isRequired,
  cartData: PropTypes.object.isRequired,
  setProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cartData: state.cart, //name of prop = alert
});

export default connect(mapStateToProps, {
  addToCart,
  incQuantity,
  decQuantity,
  removeItem,
  setProduct,
})(ModifiedProductItem);

const styles = StyleSheet.create({
  container: {
    width: "50%",
    backgroundColor: "white",
    borderColor: COLORS.textGrey,
    borderWidth: 0.5,
    paddingBottom: hp("3%"),
    paddingTop: hp("2%"),
    paddingHorizontal: wp("2%"),
  },
  productImageStyle: {
    width: "100%",
    height: hp("15%"),
  },
  productNameTextStyle: {
    fontSize: RFValue(16),
    marginTop: hp("1%"),
    color: COLORS.black,
    fontWeight: "700",
    marginRight: hp("1%"),
  },
  priceView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  priceTextStyle: {
    fontSize: RFValue(14),
    marginTop: hp("1%"),
    color: COLORS.black,
    fontWeight: "bold",
  },
  discountPriceTextStyle: {
    fontSize: RFValue(11),
    marginTop: hp("1%"),
    color: COLORS.textGrey,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    marginLeft: hp("1%"),
  },
  wrapperViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: hp("3%"),
  },
  addContainer: {
    paddingVertical: hp("0.7%"),
    paddingHorizontal: wp("7%"),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: hp("0.5%"),
    backgroundColor: COLORS.primary,
    elevation: 1,
  },
  addTextStyle: {
    fontSize: RFValue(10),
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
  outofStock: {
    paddingVertical: hp("0.7%"),
    paddingHorizontal: wp("7%"),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: hp("0.5%"),
    backgroundColor: COLORS.red,
    elevation: 1,
  },
  backgroundStyle: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.3%"),
  },
  qtyTextStyle: {
    color: "white",
  },
  offerViewStyle: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: hp("1.4%"),
    borderTopLeftRadius: hp("1.4%"),
    width: "50%",
  },
  weightTextStyle: {
    color: COLORS.black,
    fontSize: RFValue(11),
  },
});
