import {
  ADD_DELIVERY_ADDRESS_ERROR,
  ADD_DELIVERY_ADDRESS_REQUEST,
  ADD_DELIVERY_ADDRESS_SUCCESS,
  DELETE_DELIVERY_ADDRESS_SUCCESS,
  GET_DELIVERY_ADDRESS_SUCCESS,
  SET_ACTIVE_ADDRESS,
} from '../types';

const initialState = {
  addresses: [],
  loading: true,
  addDeliveryLoading: false,
  activeAddress: null,
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_DELIVERY_ADDRESS_SUCCESS:
      return {...state, addresses: payload, loading: false};

    //ADDING DELIVERY TYPES
    case ADD_DELIVERY_ADDRESS_REQUEST:
      return {...state, addDeliveryLoading: true};

    case ADD_DELIVERY_ADDRESS_ERROR:
      return {...state, addDeliveryLoading: false};

    case ADD_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: payload,
        addDeliveryLoading: false,
      };

    case DELETE_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: state.addresses.filter((address) => address._id !== payload),
      };

    case SET_ACTIVE_ADDRESS:
      return {...state, activeAddress: payload};

    default:
      return state;
  }
}
