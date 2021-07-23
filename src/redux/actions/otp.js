import axios from "axios";
import Toast from "react-native-simple-toast";

//API IMPORTS
import { API_URL } from "../../constants/url";
import { SEND_OTP_ERROR, SEND_OTP_REQUEST, SEND_OTP_SUCCESS } from "../types";

export const sendOtp = (phone) => async (dispatch) => {
  dispatch({
    type: SEND_OTP_REQUEST,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let sendData = {
    number: phone,
  };

  const body = JSON.stringify(sendData);

  try {
    const response = await axios.post(`${API_URL}/otp/sendOtp`, body, config);

    console.log(response.data);
    Toast.show("The otp has been sent to the user !", Toast.SHORT);

    dispatch({
      type: SEND_OTP_SUCCESS,
      payload: { data: response.data, type: "register" },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SEND_OTP_ERROR,
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};

export const loginSendOtp = (phone) => async (dispatch) => {
  dispatch({
    type: SEND_OTP_REQUEST,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let sendData = {
    number: phone,
  };

  const body = JSON.stringify(sendData);

  try {
    const response = await axios.post(`${API_URL}/otp/loginOtp`, body, config);

    console.log(response.data);
    Toast.show("The otp has been sent to the user !", Toast.SHORT);

    console.log("I am working????");

    dispatch({
      type: SEND_OTP_SUCCESS,
      payload: { data: response.data, type: "login" },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SEND_OTP_ERROR,
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};
