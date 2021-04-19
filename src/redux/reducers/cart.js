import {
  ADD_TO_CART,
  CHECK_INVENTORY_ERROR,
  CHECK_INVENTORY_REQUEST,
  CHECK_INVENTORY_SUCCESS,
  DECREASE_QUANTITY,
  EMPTY_CART,
  INCREASE_QUANTITY,
  REMOVE_ITEM,
} from '../types';

import Snackbar from 'react-native-snackbar';
import {COLORS} from '../../constants/theme';

const initialState = {
  items: [],
  errors: [],
  loading: false,
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case ADD_TO_CART:
      Snackbar.show({
        text: 'Product has been added to cart.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: COLORS.primary,
      });
      return {
        ...state,
        items: [...state.items, payload],
      };

    case INCREASE_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === payload ? {...item, quantity: item.quantity + 1} : item,
        ),
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === payload ? {...item, quantity: item.quantity - 1} : item,
        ),
      };

    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id != payload),
      };

    case EMPTY_CART:
      return initialState;

    case CHECK_INVENTORY_REQUEST:
      return {...state, loading: true, errors: []};

    case CHECK_INVENTORY_SUCCESS:
      return {...state, errors: payload, loading: false};

    case CHECK_INVENTORY_ERROR:
      return {...state, loading: false};

    default:
      return state;
  }
}
