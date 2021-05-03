import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import CashfreePG from "cashfreereactnativepg";
import base64 from "base-64";
import { navigate } from "../../navigations/RootNavigation";

export default class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cftoken: "",
      urlCalled: null,
      urlResponse: {},
      testData: null,
      eventData: null,
      count: 0,
      modifyOrder: false,
    };
  }

  componentDidMount() {
    const { TotalAmount } = this.props.route.params;
    this.setState({
      order: {
        appId: "32528e2b87b06b476ae6982dc82523",
        //appId: 'MTA2OTkyMDE1ODE0NDIyNTExNjYjIz',
        orderId: Math.floor(Math.random() * 10000).toString(),
        orderAmount: `${TotalAmount}`,
        orderCurrency: "INR",
        orderNote: "This is an order note",
        source: "reactsdk",
        customerName: "John",
        customerEmail: "abc@email.com",
        customerPhone: "1234561234",
        notifyUrl: "",
        paymentModes: "",
        env: "TEST",
        tokenData: "",
      },
    });

    setTimeout(() => {
      this.getToken();
    }, 1000);
  }

  componentDidUpdate() {
    if (this.state.modifyOrder) {
      this.getToken();
    }
  }

  getToken = () => {
    try {
      const { orderId, orderAmount, orderCurrency } = this.state.order;
      const tokenUrl = "https://test.cashfree.com/api/v2/cftoken/order";
      //const tokenUrl = "http://172.18.20.167:80/api/v2/cftoken/order";
      fetch(tokenUrl, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": "32528e2b87b06b476ae6982dc82523",
          "x-client-secret": "b61d1f96d0b20cc5c1427ff213a52b0ca735af06",
          //'x-client-id': 'MTA2OTkyMDE1ODE0NDIyNTExNjYjIz',
          //'x-client-secret': '63ca0b83c8ca85d73fff9c3fd29a7c87e292fd63'
        },
        body: JSON.stringify({
          orderId,
          orderAmount,
          orderCurrency,
        }),
      })
        .then((result) => {
          return result.json();
        })
        .then((response) => {
          // this.setState({urlCalled: true, urlResponse: response});
          return response;
        })
        .then((response) => {
          if (
            response.status === "OK" &&
            response.message === "Token generated"
          ) {
            var order = { ...this.state.order };
            order.tokenData = response.cftoken;
            this.setState({
              order,
              modifyOrder: false,
              urlCalled: true,
              urlResponse: response,
            });
            return;
          }
          throw {
            name: "response not success",
            message: "response was not successfull \n",
            response,
          };
        })
        .catch((err) => {
          console.log("err caught");
          console.log(err);
        });
    } catch (err) {}
  };

  render() {
    const { order, testData, eventData, urlCalled } = this.state;
    let decode = "";
    if (testData) {
      decode = base64.decode(testData);
    }
    if (!urlCalled) {
      return null;
    }
    return (
      <View style={styles.container}>
        <CashfreePG
          appId={order.appId}
          orderId={order.orderId}
          orderAmount={order.orderAmount}
          //orderCurrency = "INR"
          orderNote="This is an order note"
          source="reactsdk"
          customerName="John"
          customerEmail={order.customerEmail}
          customerPhone="1234561234"
          notifyUrl=""
          paymentModes=""
          env="test"
          tokenData={order.tokenData}
          callback={(response) => {
            let parsedResponse = JSON.parse(response);

            if (parsedResponse.txStatus === "SUCCESS") {
              //TODO: make the api call to the backend.....
              navigate("SuccessPage", {
                payment_mode: "online",
                transaction_details: parsedResponse,
              });
            } else {
              navigate("FailurePage");
            }
          }}
          //paymentOption = "nb" //nb,card,upi,wallet
          paymentCode="3333"
          //paymentCode = "4001"
          upi_vpa="testsuccess@gocash"
        />
        <Text>{testData}</Text>
        <Text>{eventData}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
  countText: {
    color: "#FF00FF",
  },
});
