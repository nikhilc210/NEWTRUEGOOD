import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS } from "../../constants/theme";

//Required Imports
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import OrderStatusStepperView from "../../components/organisms/orderscreen/OrderStatusStepperView";
import OrderDetailsView from "../../components/organisms/orderscreen/OrderDetailsView";
import ProductLoader from "../../components/inc/ProductLoader";
import { ScrollView } from "react-native-gesture-handler";

//Redux Imports
import { connect } from "react-redux";
import { getOrderDetailsById } from "../../redux/actions/order";
import OrderSingleItem from "../../components/organisms/orderscreen/OrderSingleItem";
import PastOrderItem from "../../components/organisms/orderscreen/PastOrderItem";

const PastOrderDetailScreen = ({ route, getOrderDetailsById, orderData }) => {
  const orderId = route.params.orderId;

  useEffect(() => {
    getOrderDetailsById(orderId);
  }, [orderId]);

  let stepperValue = useMemo(() => {
    if (orderData?.order?.delivery_status === "in_progress") {
      return 1;
    }
    if (orderData?.order?.delivery_status === "shipped") {
      return 2;
    }

    if (orderData?.order?.delivery_status === "delivered") {
      return 3;
    }

    return 0;
  }, [orderData?.order?.delivery_status]);

  return (
    <>
      {orderData?.singleOrderLoading || orderData?.order === null ? (
        <ProductLoader />
      ) : (
        <ScrollView
          style={styles.container}
          showsHorizontalScrollIndicator={false}
        >
          <Text style={styles.totalTitleTextStyle}>
            Total Items Ordered : {orderData?.order?.order_details?.length}
          </Text>

          {orderData?.order?.delivery_status === "cancel" ? (
            <View>
              {orderData?.order?.order_details?.map((orderDetail, index) => {
                return <OrderSingleItem data={orderDetail} key={index} />;
              })}
            </View>
          ) : (
            <View>
              {orderData?.order?.order_details?.map((orderDetail, index) => {
                return <PastOrderItem data={orderDetail} key={index} />;
              })}
            </View>
          )}

          <OrderDetailsView order_total={orderData?.order?.order_total} />

          {orderData?.order?.delivery_status === "cancel" ? null : (
            <OrderStatusStepperView
              currentPosition={stepperValue ? stepperValue : 0}
            />
          )}

          <View style={styles.deliveryAddressViewStyle}>
            <View style={styles.messageViewStyle}>
              <Text style={styles.totalTitleTextStyle}>
                Message from vendor
              </Text>
              <Text style={styles.orderReceivedTextStyle}>Order Received</Text>
              <Text style={styles.orderStatusDetailTextStyle}>
                Your order is with us. It getting reday for dispach.Order will
                be delivered by Ramesh in approx 120 mins
              </Text>
            </View>
            <Text style={styles.orderReceivedTextStyle}>Delivery Address</Text>
            <Text style={{ fontWeight: "bold", fontSize: RFValue(10) }}>
              Type:
            </Text>
            <Text style={styles.orderStatusDetailTextStyle}>
              {orderData?.order?.delivery_address?.type}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: RFValue(10) }}>
              Full Name:
            </Text>
            <Text style={styles.orderStatusDetailTextStyle}>
              {orderData?.order?.delivery_address?.firstName}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: RFValue(10) }}>
              Last Name:
            </Text>
            <Text style={styles.orderStatusDetailTextStyle}>
              {orderData?.order?.delivery_address?.lastName}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: RFValue(10) }}>
              Phone Number:
            </Text>
            <Text style={styles.orderStatusDetailTextStyle}>
              {orderData?.order?.delivery_address?.number}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: RFValue(10) }}>
              Full Address:
            </Text>
            <Text style={styles.orderStatusDetailTextStyle}>
              {orderData?.order?.delivery_address?.street_address},
              {orderData?.order?.delivery_address?.pincode},
              {orderData?.order?.delivery_address?.city}
            </Text>

            <Text style={styles.orderReceivedTextStyle}>Delivery Slot</Text>
            <Text style={styles.orderStatusDetailTextStyle}>
              {" "}
              {orderData?.order?.delivery_slot_data}
            </Text>

            <Text style={styles.orderReceivedTextStyle}>Payment Type</Text>
            <Text style={styles.orderStatusDetailTextStyle}>
              {orderData?.order?.payment_mode}
            </Text>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  orderData: state.order, //name of prop = alert
});

export default connect(mapStateToProps, { getOrderDetailsById })(
  PastOrderDetailScreen
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: hp("2%") },
  totalTitleTextStyle: {
    fontSize: RFValue(14),
    color: COLORS.black,
    fontFamily: FONTS.primaryFONT,
    marginTop: hp("1%"),
    fontWeight: "bold",
  },
  orderListViewStyle: { marginTop: hp("2%") },
  cancelViewStyle: { marginTop: hp("3%") },
  cancelButtonStyle: {
    borderWidth: 1,
    borderColor: "#B83136",
    alignItems: "center",
    justifyContent: "center",
    padding: hp("2%"),
  },
  cancelTextSytle: {
    color: "#B83136",
    fontFamily: FONTS.primaryFONT,
    fontWeight: "700",
  },
  deliveryAddressViewStyle: {
    marginTop: hp("3%"),
    borderTopWidth: 1,
    borderTopColor: COLORS.textGrey,
    paddingTop: hp("2%"),
    paddingBottom: hp("2%"),
  },
  messageViewStyle: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.textGrey,
    paddingBottom: hp("2%"),
  },
  orderReceivedTextStyle: {
    fontSize: RFValue(12),
    color: COLORS.black,
    fontFamily: FONTS.primaryFONT,
    marginTop: hp("1%"),
    fontWeight: "bold",
  },
  orderStatusDetailTextStyle: {
    fontSize: RFValue(12),
    color: "#818596",
    fontFamily: FONTS.primaryFONT,
  },
});
