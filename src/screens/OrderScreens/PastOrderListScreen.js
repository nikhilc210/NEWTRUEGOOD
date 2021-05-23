import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
//Required Imports
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ProductLoader from "../../components/inc/ProductLoader";
//Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPastOrders } from "../../redux/actions/order";
import PastOrderListItem from "../../components/organisms/orderscreen/PastOrderListItem";
import { ScrollView } from "react-native-gesture-handler";

const PastOrderListScreen = ({
  getPastOrders,
  orderData: { pastOrders, pastOrderLoading },
}) => {
  useFocusEffect(
    React.useCallback(() => {
      getPastOrders();
    }, [])
  );

  return (
    <View style={styles.container}>
      {pastOrderLoading ? (
        <ProductLoader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {pastOrders?.length > 0 ? (
            pastOrders?.map((order) => (
              <PastOrderListItem item={order} key={order._id} />
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

PastOrderListScreen.propTypes = {
  orderData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  orderData: state.order, //name of prop = alert
});

export default connect(mapStateToProps, { getPastOrders })(PastOrderListScreen);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: hp("2%") },
});
