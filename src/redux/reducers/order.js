import {
  ADD_ORDER_ERROR,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  GET_LIVE_ORDER_ERROR,
  GET_LIVE_ORDER_REQUEST,
  GET_LIVE_ORDER_SUCCESS,
  GET_ORDER_DETAILS_ERROR,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_PAST_ORDER_ERROR,
  GET_PAST_ORDER_REQUEST,
  GET_PAST_ORDER_SUCCESS,
} from '../types';

const initialState = {
  loading: false,
  liveOrders: [],
  pastOrders: [],
  liveOrderLoading: false,
  pastOrderLoading: false,
  singleOrderLoading: false,
  order: null,
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case ADD_ORDER_REQUEST:
      return {...state, loading: true};

    case ADD_ORDER_SUCCESS:
      return {...state, loading: false};

    case ADD_ORDER_ERROR:
      return {...state, loading: false};

    case GET_LIVE_ORDER_REQUEST:
      return {...state, liveOrderLoading: true};

    case GET_LIVE_ORDER_SUCCESS:
      return {...state, liveOrders: payload, liveOrderLoading: false};

    case GET_LIVE_ORDER_ERROR:
      return {...state, liveOrderLoading: false};

    case GET_PAST_ORDER_REQUEST:
      return {...state, pastOrderLoading: true};

    case GET_PAST_ORDER_SUCCESS:
      return {...state, pastOrders: payload, pastOrderLoading: false};

    case GET_PAST_ORDER_ERROR:
      return {...state, pastOrderLoading: false};

    case GET_ORDER_DETAILS_REQUEST:
      return {...state, singleOrderLoading: true};

    case GET_ORDER_DETAILS_SUCCESS:
      return {...state, order: payload, singleOrderLoading: false};

    case GET_ORDER_DETAILS_ERROR:
      return {...state, singleOrderLoading: false};
    default:
      return state;
  }
}
