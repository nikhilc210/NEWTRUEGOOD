import {
  ADD_USER_DETAILS,
  ADD_USER_DETAILS_ERROR,
  ADD_USER_NUMBER,
  FACEBOOK_LOGIN_REQUEST,
  GOOGLE_LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REQUEST_CHECK_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_LOAD_SUCCESS,
  USER_LOG_OUT,
} from '../types';

import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  token: null,
  user: null,
  receivedData: null,
  receivedNumber: '',
  isAuthenticated: false,
  loading: false,
  checkUserLoading: false,
  updateLoading: false,
  facebookLoginLoading: false,
  googleLoginLoading: false,
};

const _storeData = async (token) => {
  try {
    await AsyncStorage.setItem('TRUEGOOD:user_token', token);
  } catch (error) {
    console.log(error);
  }
};

const _removeToken = async () => {
  try {
    await AsyncStorage.removeItem('TRUEGOOD:user_token');
  } catch (error) {
    console.log(error);
  }
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    //Check user & add detaisl
    case REQUEST_CHECK_USER:
      return {...state, checkUserLoading: true};

    case ADD_USER_DETAILS:
      return {
        ...state,
        receivedData: payload,
        checkUserLoading: false,
        facebookLoginLoading: false,
        googleLoginLoading: false,
      };

    case ADD_USER_DETAILS_ERROR:
      return {
        ...state,
        receivedData: null,
        checkUserLoading: false,
        facebookLoginLoading: false,
        googleLoginLoading: false,
      };

    case ADD_USER_NUMBER:
      return {...state, receivedNumber: payload, loading: false};

    //Load User
    case USER_LOAD_SUCCESS:
      return {...state, user: payload, isAuthenticated: true, loading: false};
    //Register user
    case REGISTER_REQUEST:
      return {...state, loading: true};

    //Register success
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        receivedData: null,
        receivedNumber: '',
        facebookLoginLoading: false,
        googleLoginLoading: false,
      };

    //Login Types:
    case LOGIN_REQUEST:
      return {...state, loading: true};

    case LOGIN_SUCCESS:
      _storeData(payload.token);
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        facebookLoginLoading: false,
        googleLoginLoading: false,
      };

    case LOGIN_ERROR:
      return initialState;

    case USER_LOG_OUT:
      _removeToken();
      return initialState;

    case UPDATE_USER_REQUEST:
      return {...state, updateLoading: true};

    case UPDATE_USER_SUCCESS:
      return {...state, user: payload.user, updateLoading: false};

    case UPDATE_USER_ERROR:
      return {...state, updateLoading: false};

    case FACEBOOK_LOGIN_REQUEST:
      return {...state, facebookLoginLoading: true};

    case GOOGLE_LOGIN_REQUEST:
      return {...state, googleLoginLoading: true};

    default:
      return state;
  }
}
