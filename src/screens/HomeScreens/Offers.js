import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ModifiedProductItem from "../../components/atoms/ModifiedProductItem";
import HomeHeader from "../../components/inc/HomeHeader";
import DealBanner from "../../components/organisms/homescreen/DealBanner";

//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOfferProducts } from "../../redux/actions/product";
import ProductLoader from "../../components/inc/ProductLoader";

//sheet imports
import BottomSheet from "../AuthScreens/BottomSheet";
import RegisterSheet from "../AuthScreens/RegisterSheet";
import MobileBottomSheet from "../AuthScreens/MobileBottomSheet";
import LoginOTPSheet from "../AuthScreens/LoginOTPSheet";
import RegisterOTPSheet from "../AuthScreens/RegisterOTPSheet";

const OffersScreen = ({
  productData: { products, loading },
  getOfferProducts,
}) => {
  useEffect(() => {
    getOfferProducts();
  }, []);

  return (
    <View style={styles.container}>
      <HomeHeader title="Offers" />

      {loading ? (
        <ProductLoader />
      ) : (
        <>
          <DealBanner />
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            numColumns={2}
            renderItem={({ item }) => {
              return <ModifiedProductItem item={item} />;
            }}
          />
          <BottomSheet />
          <RegisterSheet />
          <MobileBottomSheet />
          <LoginOTPSheet />
          <RegisterOTPSheet />
        </>
      )}
    </View>
  );
};

OffersScreen.propTypes = {
  productData: PropTypes.object,
  getOfferProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  productData: state.product, //name of prop = alert
});

export default connect(mapStateToProps, { getOfferProducts })(OffersScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
