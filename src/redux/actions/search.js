import axios from 'axios';
//API IMPORTS
import {API_URL} from '../../constants/url';

//Types Imports
import {
  FILTER_PRODUCT,
  SEARCH_PRODUCTS_ERROR,
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SET_QUERY,
} from '../types';

export const searchProducts = (query) => async (dispatch) => {
  dispatch({
    type: SEARCH_PRODUCTS_REQUEST,
  });

  dispatch({
    type: SET_QUERY,
    payload: query,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let sendData = {
    query,
  };

  const body = JSON.stringify(sendData);

  try {
    const res = await axios.post(`${API_URL}/search`, body, config);

    dispatch({
      type: SEARCH_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_PRODUCTS_ERROR,
    });
  }
};

export const filterProductOnCategory = (categoryId) => async (dispatch) => {
  dispatch({
    type: FILTER_PRODUCT,
    payload: categoryId,
  });
};
