import Snackbar from 'react-native-snackbar';
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  SET_PRODUCT_LOADING,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_ERROR,
  ADD_RATING_REQUEST,
  ADD_RATING_SUCCESS,
  ADD_RATING_ERROR,
  GET_MAIN_OFFER_SUCCESS,
  GET_MAIN_OFFER_ERROR,
} from '../types';

const initialState = {
  products: [],
  product: null,
  loading: true,
  singleProductLoading: false,
  addRatingLoading: false,
  mainOfferProducts: [],
  mainOfferLoading: true,
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case SET_PRODUCT_LOADING:
      return {...state, loading: true};

    case GET_PRODUCTS_SUCCESS:
      return {...state, products: payload, loading: false};

    case GET_PRODUCTS_ERROR:
      alert('Unable to fetch the products');
      return {...state, loading: false};

    //Single Products
    case GET_PRODUCT_BY_ID_REQUEST:
      return {...state, singleProductLoading: true};

    case GET_PRODUCT_BY_ID_SUCCESS:
      return {...state, product: payload, singleProductLoading: false};

    case GET_PRODUCT_BY_ID_ERROR:
      alert('Unable to fetch the products');
      return {...state, product: null, singleProductLoading: false};

    //RATING TYPES::::
    case ADD_RATING_REQUEST:
      return {...state, addRatingLoading: true};

    case ADD_RATING_SUCCESS:
      return {...state, addRatingLoading: false};

    case ADD_RATING_ERROR:
      return {...state, addRatingLoading: false};

    //MAIN PRODUCT TYPESS::::::::::
    case GET_MAIN_OFFER_SUCCESS:
      return {...state, mainOfferProducts: payload, mainOfferLoading: false};

    case GET_MAIN_OFFER_ERROR:
      return {...state, mainOfferLoading: false};
    default:
      return state;
  }
}
