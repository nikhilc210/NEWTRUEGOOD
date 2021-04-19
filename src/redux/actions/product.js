import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import setAuthToken from '../../../utils/setAuthToken';

import Toast from 'react-native-simple-toast'



//API IMPORTS
import {API_URL} from '../../constants/url';

import {navigate} from '../../navigations/RootNavigation';

//Types Imports
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_ERROR,
  GET_PRODUCT_BY_ID_REQUEST,
  ADD_RATING_REQUEST,
  ADD_RATING_SUCCESS,
  ADD_RATING_ERROR,
  GET_MAIN_OFFER_SUCCESS,
  GET_MAIN_OFFER_ERROR,
  FILTER_PRODUCT,
} from '../types';

export const getProuctsByCategoryId = (categoryId) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/product/${categoryId}`);
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCTS_ERROR,
    });
  }
};

export const getOfferProducts = () => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/product/offers`);
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCTS_ERROR,
    });
  }
};

export const getMainOfferProducts = () => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/product/mainOffers`);
    dispatch({
      type: GET_MAIN_OFFER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_MAIN_OFFER_ERROR,
    });
  }
};

export const setProduct = (productData) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCT_BY_ID_SUCCESS,
    payload: productData,
  });
};

export const getProductById = (productId) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCT_BY_ID_REQUEST,
  });
  try {
    const res = await axios.get(`${API_URL}/product/details/${productId}`);
    dispatch({
      type: GET_PRODUCT_BY_ID_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCT_BY_ID_ERROR,
    });
  }
};

export const addProductRating = (data) => async (dispatch) => {
  dispatch({
    type: ADD_RATING_REQUEST,
  });

  let token = await AsyncStorage.getItem('TRUEGOOD:user_token');
  if (token) {
    setAuthToken(token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(data);

  try {
    await axios.post(`${API_URL}/product/addRating`, body, config);

    dispatch({
      type: ADD_RATING_SUCCESS,
    });

    Toast.show(
      'The rating has been added successfully !',
      Toast.SHORT,
    );

    navigate('Home');
  } catch (err) {
    const errors = err?.response?.data?.errors;
    dispatch({
      type: ADD_RATING_ERROR,
    });
    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};
