import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import setAuthToken from '../../../utils/setAuthToken';

import Toast from 'react-native-simple-toast'


//API IMPORTS
import {API_URL} from '../../constants/url';
import {
  GET_LIVE_ORDER_ERROR,
  GET_LIVE_ORDER_REQUEST,
  GET_LIVE_ORDER_SUCCESS,
  GET_ORDER_DETAILS_ERROR,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_PAST_ORDER_ERROR,
  GET_PAST_ORDER_REQUEST,
  GET_PAST_ORDER_SUCCESS,
  SEND_OTP_REQUEST,
} from '../types';

export const saveOrders = () => async (dispatch) => {
  dispatch({
    type: SEND_OTP_REQUEST,
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let token = await AsyncStorage.getItem('TRUEGOOD:user_token');
  if (token) {
    setAuthToken(token);
  }

  const body = JSON.stringify(sendData);

  try {
    await axios.post(`${API_URL}/otp/sendOtp`, body, config);

    Toast.show(
      'The order has been saved successfully!',
      Toast.SHORT,
    );
  } catch (err) {
    console.log(err);
    Toast.show('The order save error occured !', Toast.SHORT);
  }
};

export const getLiveOrders = () => async (dispatch) => {
  dispatch({
    type: GET_LIVE_ORDER_REQUEST,
  });

  let token = await AsyncStorage.getItem('TRUEGOOD:user_token');
  if (token) {
    setAuthToken(token);
  }

  try {
    const response = await axios.get(`${API_URL}/order/liveOrders`);

    dispatch({
      type: GET_LIVE_ORDER_SUCCESS,
      payload: response.data,
    });

    //
  } catch (err) {
    dispatch({
      type: GET_LIVE_ORDER_ERROR,
    });
    const errors = err?.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};

export const getPastOrders = () => async (dispatch) => {
  dispatch({
    type: GET_PAST_ORDER_REQUEST,
  });

  let token = await AsyncStorage.getItem('TRUEGOOD:user_token');
  if (token) {
    setAuthToken(token);
  }

  try {
    const response = await axios.get(`${API_URL}/order/pastOrders`);

    dispatch({
      type: GET_PAST_ORDER_SUCCESS,
      payload: response.data,
    });

    //
  } catch (err) {
    dispatch({
      type: GET_PAST_ORDER_ERROR,
    });
    const errors = err?.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};

export const getOrderDetailsById = (orderId) => async (dispatch) => {
  dispatch({
    type: GET_ORDER_DETAILS_REQUEST,
  });

  try {
    const response = await axios.get(
      `${API_URL}/order/orderDetails/${orderId}`,
    );

    dispatch({
      type: GET_ORDER_DETAILS_SUCCESS,
      payload: response.data,
    });

    //
  } catch (err) {
    dispatch({
      type: GET_ORDER_DETAILS_ERROR,
    });
    const errors = err?.response?.data?.errors;
    if (errors) {
      alert('Error Fetching the Single Order Detail');
    }
  }
};
