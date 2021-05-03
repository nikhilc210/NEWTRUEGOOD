import axios from "axios";
import setAuthToken from "./utils/setAuthToken";
//API IMPORTS
import { API_URL } from "./src/constants/url";
import AsyncStorage from "@react-native-community/async-storage";
import Snackbar from "react-native-snackbar";
import { navigate } from "./src/navigations/RootNavigation";
import Toast from "react-native-simple-toast";

export const createOrder = async (orderData) => {
  let token = await AsyncStorage.getItem("TRUEGOOD:user_token");
  if (token) {
    setAuthToken(token);
  }

  const {
    order_line,
    delivery_address_id,
    delivery_slot,
    payment_mode,
    transaction_details,
  } = orderData;

  const total_price = order_line.reduce(
    (acc, current) => acc + parseFloat(current.price * current.quantity),
    0
  );

  const send_price = total_price > 900 ? total_price : total_price + 50;
  const delivery_charge = total_price > 900 ? 50 : 0;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let sendData = {
    order_line,
    delivery_address_id,
    delivery_slot,
    order_total: send_price,
    payment_mode,
    transaction_details: transaction_details ? transaction_details : {},
    delivery_charge,
  };

  const body = JSON.stringify(sendData);

  try {
    await axios.post(`${API_URL}/order/create`, body, config);

    Toast.show("The order has been saved successfully !", Toast.SHORT);
    //ending
  } catch (err) {
    const errors = err?.response?.data?.errors;
    if (errors) {
      errors.forEach((error) =>
        Snackbar.show({
          text: error.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: "red",
        })
      );
    }
  }
};

export const getMinimumPrice = async () => {
  try {
    const amount = await axios.get(`${API_URL}/static/maximumPrice`);

    return amount.data;

    //
  } catch (err) {
    const errors = err?.response?.data?.errors;
    if (errors) {
      errors.forEach((error) =>
        Snackbar.show({
          text: "Error Fetching the Minimum Cart Amount",
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: "red",
        })
      );
    }
  }
};

export const cancelOrder = async (orderId, status) => {
  try {
    await axios.get(`${API_URL}/order/cancel/${orderId}`);

    if (status === "cod") {
      alert("Your order has been cancelled.");
    } else {
      alert(
        "Your order has been cancelled and amount will refund to your account in 2-3 business day."
      );
    }

    navigate("LiveOrderListScreen");
    //
  } catch (err) {
    console.log(err);
    const errors = err?.response?.data?.errors;
    if (errors) {
      errors.forEach((error) =>
        Snackbar.show({
          text: "Error Fetching the Live Orders",
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: "red",
        })
      );
    }
  }
};
