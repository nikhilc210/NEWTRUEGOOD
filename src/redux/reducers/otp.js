import {SEND_OTP_ERROR, SEND_OTP_REQUEST, SEND_OTP_SUCCESS} from '../types';

const initialState = {
  loading: false,
  otp: '',
  error: false,
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case SEND_OTP_REQUEST:
      return {...state, loading: true};

    case SEND_OTP_SUCCESS:
      return {...state, otp: payload, loading: false, error: false};

    case SEND_OTP_ERROR:
      return {...state, error: true, loading: false};

    default:
      return state;
  }
}
