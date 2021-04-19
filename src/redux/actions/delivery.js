import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import setAuthToken from '../../../utils/setAuthToken';
import Toast from 'react-native-simple-toast'

//API IMPORTS
import {API_URL} from '../../constants/url';
import {
  ADD_DELIVERY_ADDRESS_ERROR,
  ADD_DELIVERY_ADDRESS_REQUEST,
  ADD_DELIVERY_ADDRESS_SUCCESS,
  DELETE_DELIVERY_ADDRESS_SUCCESS,
  GET_DELIVERY_ADDRESS_ERROR,
  GET_DELIVERY_ADDRESS_SUCCESS,
  SET_ACTIVE_ADDRESS,
} from '../types';

export const getAddress = () => async (dispatch) => {
  let token = await AsyncStorage.getItem('TRUEGOOD:user_token');
  if (token) {
    setAuthToken(token);
  }
  try {
    let res = await axios.get(`${API_URL}/customer/getAddress`);

    if (res.data.length === 1) {
      dispatch({
        type: SET_ACTIVE_ADDRESS,
        payload: res.data[0],
      });
    }

    dispatch({
      type: GET_DELIVERY_ADDRESS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    const errors = err?.response?.data?.errors;
    dispatch({
      type: GET_DELIVERY_ADDRESS_ERROR,
    });
    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};

export const addAddress = (data) => async (dispatch, getState) => {
  dispatch({
    type: ADD_DELIVERY_ADDRESS_REQUEST,
  });

  let token = await AsyncStorage.getItem('TRUEGOOD:user_token');
  if (token) {
    setAuthToken(token);
  }

  const {
    firstname,
    lastname,
    addressType,
    streetAddress,
    pincode,
    city,
    number,
  } = data;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let sendData = {
    firstName: firstname,
    lastName: lastname,
    type: addressType,
    street_address: streetAddress,
    pincode,
    city,
    number,
  };

  const body = JSON.stringify(sendData);

  try {
    let addressData = await axios.post(
      `${API_URL}/customer/addAddress`,
      body,
      config,
    );

    Toast.show(
      'The address has been added successfully !',
      Toast.SHORT,
    );

    if (addressData.data.length === 1) {
      dispatch({
        type: SET_ACTIVE_ADDRESS,
        payload: addressData.data[0],
      });

      dispatch({
        type: ADD_DELIVERY_ADDRESS_SUCCESS,
        payload: addressData.data,
      });
    } else {
      dispatch({
        type: ADD_DELIVERY_ADDRESS_SUCCESS,
        payload: addressData.data,
      });
    }
  } catch (err) {
    const errors = err?.response?.data?.errors;

    console.log(err?.response?.data?.errors);

    dispatch({
      type: ADD_DELIVERY_ADDRESS_ERROR,
    });
    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};

export const deleteAddress = (addressId) => async (dispatch, getState) => {
  let token = await AsyncStorage.getItem('TRUEGOOD:user_token');
  if (token) {
    setAuthToken(token);
  }
  try {
    await axios.delete(`${API_URL}/customer/deleteAddress/${addressId}`);

    if (getState().delivery.activeAddress?._id === addressId) {
      dispatch({
        type: SET_ACTIVE_ADDRESS,
        payload: null,
      });
    }

    dispatch({
      type: DELETE_DELIVERY_ADDRESS_SUCCESS,
      payload: addressId,
    });
    Toast.show(
      'The address has been deleted successfully !',
      Toast.SHORT,
    );
  } catch (err) {
    const errors = err?.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};

export const setActiveAddress = (address) => async (dispatch) => {
  dispatch({
    type: SET_ACTIVE_ADDRESS,
    payload: address,
  });
};
