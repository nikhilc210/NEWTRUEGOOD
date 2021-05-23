import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
//Required Imports
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import LiveOrderListItem from "../../components/organisms/orderscreen/LiveOrderListItem";
import ProductLoader from "../../components/inc/ProductLoader";
//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getLiveOrders } from "../../redux/actions/order";
import { ScrollView } from "react-native-gesture-handler";

const LiveOrderListScreen = ({
  getLiveOrders,
  orderData: { liveOrders, liveOrderLoading },
}) => {
  useFocusEffect(
    React.useCallback(() => {
      getLiveOrders();
    }, [])
  );

  return (
    <View style={styles.container}>
      {liveOrderLoading ? (
        <ProductLoader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {liveOrders?.length > 0 ? (
            liveOrders?.map((order) => (
              <LiveOrderListItem item={order} key={order._id} />
            ))
          ) : (
            <View>
              <Text style={{ textAlign: "center", marginTop: hp("35%") }}>
                You have no orders yet! Order now with TrueGood 😀
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

LiveOrderListScreen.propTypes = {
  orderData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  orderData: state.order, //name of prop = alert
});

export default connect(mapStateToProps, { getLiveOrders })(LiveOrderListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: hp("2%"),
  },
});
