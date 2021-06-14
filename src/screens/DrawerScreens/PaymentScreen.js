import React, { Component } from "react";
import { Button, View } from "react-native";
import RNPgReactNativeSdk from "react-native-pg-react-native-sdk";
import { StyleSheet } from "react-native";
import { navigate } from "../../navigations/RootNavigation";

const WEB = "WEB";

const apiKey = "7712709705bb72f5dce87100972177"; // put your apiKey here
const apiSecret = "2e8cba087905ce989e424c485f0f5402f83aac41"; // put your apiSecret here

const env = "PROD"; // use 'TEST or 'PROD'

export default class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAmount: 0,
    };
  }

  componentDidMount() {
    const { TotalAmount } = this.props.route.params;
    this.setState({
      totalAmount: TotalAmount,
    });

    setTimeout(() => {
      this._startCheckout(WEB, null);
    }, 500);
  }

  async _createOrderWithToken() {
    let orderId;
    let tokenUrl;

    if (env === "TEST") {
      tokenUrl = "https://test.cashfree.com/api/v2/cftoken/order"; //for TEST
    } else {
      tokenUrl = "https://api.cashfree.com/api/v2/cftoken/order"; //for PROD
    }

    orderId = "Order" + parseInt(100000000 * Math.random(), 10);
    let orderApiMap = {
      orderId: orderId,
      orderAmount: this.state.totalAmount,
      orderCurrency: "INR",
    };

    const postParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": apiKey,
        "x-client-secret": apiSecret,
      },
      body: JSON.stringify(orderApiMap),
    };
    return new Promise((resolve, reject) => {
      let cfToken;
      fetch(tokenUrl, postParams)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log("data" + data);
          if (data.status === "ERROR") {
            console.log(
              `Error (code: ${data.subCode}, message: ${data.message})`
            );
            console.log(
              "Please check the apiKey and apiSecret credentials and the environment"
            );
            return;
          }
          try {
            cfToken = data.cftoken;
            let map = {
              orderId: orderId,
              orderAmount: this.state.totalAmount.toString(),
              tokenData: cfToken,
              orderCurrency: "INR",
            };
            return resolve(map);
          } catch (error) {
            console.log("THE ERROR IS " + data);
            return reject(data);
          }
        });
    });
  }

  async _startCheckout(mode, appId) {
    let responseHandler = (result) => {
      try {
        let output = "";
        JSON.parse(result, function (key, value) {
          if (key !== "") {
            output = output + key + " : " + value + "\n";
          }

          console.log(result);

          if (result.txStatus === "SUCCESS") {
            navigate("SuccessPage", {
              payment_mode: "online",
              transaction_details: result,
            });
          } else {
            navigate("FailurePage");
          }
        });
      } catch (error) {
        navigate("FailurePage");
      }
    };

    try {
      let map = await this._createOrderWithToken();
      // console.log('THE MAP IS ' + JSON.stringify(map));
      let checkoutMap = {
        orderId: map.orderId,
        orderAmount: map.orderAmount,
        appId: apiKey,
        tokenData: map.tokenData,
        orderCurrency: map.orderCurrency,
        orderNote: "Test Note",
        customerName: "Cashfree User",
        customerPhone: "9999999999",
        customerEmail: "info@truegood.in",
        hideOrderId: true,
        color1: "#6002EE",
        color2: "#ffff1f",
      };

      RNPgReactNativeSdk.startPaymentWEB(checkoutMap, env, responseHandler);
    } catch (error) {
      alert("Error Occured while starting payment. Please try again later.");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
            onPress={() => this._startCheckout(WEB, null)}
            title="START PAYMENT"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === "ios" ? 56 : 24,
    backgroundColor: "#eaeaea",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
  button: {
    color: "#61aafb",
    margin: 8,
    width: 200,
  },
  round_icon_buttons: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    margin: 16,
  },
  upi_icon_containers: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  upi_icons_text: {
    fontSize: 12,
    width: 100,
    textAlign: "center",
    fontWeight: "bold",
  },
  upi_app_not_found: {
    fontSize: 14,
    justifyContent: "center",
    alignContent: "center",
  },
  upi_image: {
    width: 50,
    height: 50,
  },
  response_text: {
    margin: 16,
    fontSize: 14,
  },
});
