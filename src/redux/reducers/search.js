import {Snackbar} from 'react-native-paper';
import {
  FILTER_PRODUCT,
  SEARCH_PRODUCTS_ERROR,
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SET_QUERY,
} from '../types';
import product from './product';

const initialState = {
  products: [],
  query: '',
  loading: false,
  filterProducts: [],
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case SEARCH_PRODUCTS_REQUEST:
      return {...state, loading: true};

    case SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
        filterProducts: payload,
        loading: false,
      };

    case SEARCH_PRODUCTS_ERROR:
      alert('Unable to search the products');
      return {...state, loading: false};

    case SET_QUERY:
      return {...state, query: payload};

    case FILTER_PRODUCT:
      return {
        ...state,
        filterProducts: state.products.filter(
          (product) => product.category == payload,
        ),
        loading: false,
      };

    default:
      return state;
  }
}
