import {
  CHECK_INVENTORY_ERROR,
  CHECK_INVENTORY_REQUEST,
  CHECK_INVENTORY_SUCCESS,
} from '../types';

const initialState = {
  errors: [],
  loading: false,
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
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
