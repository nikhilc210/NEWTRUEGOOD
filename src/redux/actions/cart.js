import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_ITEM,
} from '../types';

export const addToCart = (productDetails) => async (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: productDetails,
  });
};

export const incQuantity = (productId) => async (dispatch) => {
  dispatch({
    type: INCREASE_QUANTITY,
    payload: productId,
  });
};

export const decQuantity = (productId) => async (dispatch) => {
  dispatch({
    type: DECREASE_QUANTITY,
    payload: productId,
  });
};

export const removeItem = (productId) => async (dispatch) => {
  dispatch({
    type: REMOVE_ITEM,
    payload: productId,
  });
};
