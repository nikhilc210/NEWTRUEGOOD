import {
  ADD_BOTTOM_REF,
  ADD_LOGIN_OTP_REF,
  ADD_MOBILE_REF,
  ADD_OTP_REF,
  ADD_REGISTER_OTP_REF,
  ADD_REGISTER_SHEET_REF,
} from "../types";

const initialState = {
  bottomRef: {},
  mobileRef: {},
  otpRef: {},
  loginOtpRef: {},
  registerOtpRef: {},
  registerSheetRef: {},
  alreadyOpened: false,
};

const bottomSheetReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_BOTTOM_REF:
      return { ...state, bottomRef: payload };

    case ADD_MOBILE_REF:
      return { ...state, mobileRef: payload };

    case ADD_OTP_REF:
      return { ...state, otpRef: payload };

    case ADD_LOGIN_OTP_REF:
      return { ...state, loginOtpRef: payload };

    case ADD_REGISTER_OTP_REF:
      return { ...state, registerOtpRef: payload };

    case ADD_REGISTER_SHEET_REF:
      return { ...state, registerSheetRef: payload };


    
    case 'INITIAL_OPEN':
      return {...state,alreadyOpened:true}

    default:
      return state;
  }
};

export default bottomSheetReducer;
