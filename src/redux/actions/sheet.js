import {
  ADD_BOTTOM_REF,
  ADD_LOGIN_OTP_REF,
  ADD_MOBILE_REF,
  ADD_OTP_REF,
  ADD_REGISTER_OTP_REF,
  ADD_REGISTER_SHEET_REF,
} from "../types";

export const addBottomRef = (bottomRef) => async (dispatch) => {
  dispatch({
    type: ADD_BOTTOM_REF,
    payload: bottomRef,
  });
};

export const addMobileRef = (mobileRef) => async (dispatch) => {
  dispatch({
    type: ADD_MOBILE_REF,
    payload: mobileRef,
  });
};

export const addOTPRef = (otpRef) => async (dispatch) => {
  dispatch({
    type: ADD_OTP_REF,
    payload: otpRef,
  });
};

export const addLoginOtpRef = (otpRef) => async (dispatch) => {
  dispatch({
    type: ADD_LOGIN_OTP_REF,
    payload: otpRef,
  });
};

export const addRegisterOtpRef = (otpRef) => async (dispatch) => {
  dispatch({
    type: ADD_REGISTER_OTP_REF,
    payload: otpRef,
  });
};

export const addRegisterSheetRef = (otpRef) => async (dispatch) => {
  dispatch({
    type: ADD_REGISTER_SHEET_REF,
    payload: otpRef,
  });
};

export const initialSheetOpen = () => async (dispatch) => {
  dispatch({
    type: "INITIAL_OPEN",
  });
};
