import axios from "axios";
import setAuthToken from "../../../utils/setAuthToken";

import Toast from "react-native-simple-toast";

//API IMPORTS
import { API_URL } from "../../constants/url";
import { navigate } from "../../navigations/RootNavigation";

import {
  ADD_USER_DETAILS,
  ADD_USER_DETAILS_ERROR,
  ADD_USER_NUMBER,
  EMPTY_CART,
  FACEBOOK_LOGIN_REQUEST,
  GOOGLE_LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REQUEST_CHECK_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_LOAD_SUCCESS,
  USER_LOG_OUT,
} from "../types";

export const loadUser = (token) => async (dispatch) => {
  setAuthToken(token);
  try {
    let res = await axios.get(`${API_URL}/customer/me`);
    dispatch({
      type: USER_LOAD_SUCCESS,
      payload: res.data,
    });

    navigate("DrawerNavigator");
  } catch (err) {
    dispatch({
      type: USER_LOG_OUT,
    });
    navigate("DrawerNavigator");
  }
};

export const checkUser = (userData, type) => async (dispatch) => {
  if (type === "fb") {
    dispatch({
      type: FACEBOOK_LOGIN_REQUEST,
    });
  } else if (type === "google") {
    dispatch({
      type: GOOGLE_LOGIN_REQUEST,
    });
  } else if (type === "apple") {
    dispatch({
      type: "APPLE_LOGIN_REQUEST",
    });
  } else {
    dispatch({
      type: REQUEST_CHECK_USER,
    });
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let sendData = {
    email: userData.email,
  };

  const body = JSON.stringify(sendData);

  try {
    await axios.post(`${API_URL}/customer/check`, body, config);

    console.log(userData);

    dispatch({
      type: ADD_USER_DETAILS,
      payload: userData,
    });

    // dispatch({
    //   type: LOGIN_SUCCESS,
    //   payload: userData,
    // });
  } catch (err) {
    dispatch({
      type: ADD_USER_DETAILS_ERROR,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};

export const addUserNumber = (number) => async (dispatch) => {
  dispatch({
    type: ADD_USER_NUMBER,
    payload: number,
  });
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch({
    type: REGISTER_REQUEST,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let sendData = {
    name: userData.name,
    email: userData.email,
    mobile: userData.number,
  };

  const body = JSON.stringify(sendData);

  try {
    const response = await axios.post(
      `${API_URL}/customer/register`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    Toast.show("Sign up Successful !", Toast.SHORT);

    //
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: LOGIN_ERROR,
    });
    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};

export const loginUser = (userData) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let sendData = {
    name: userData.name,
    email: userData.email,
  };

  const body = JSON.stringify(sendData);

  try {
    const response = await axios.post(
      `${API_URL}/customer/loginSocial`,
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    Toast.show("The user login is successful !", Toast.SHORT);
  } catch (err) {
    const errors = err?.response?.data?.errors;
    dispatch({
      type: LOGIN_ERROR,
    });
    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};

export const facebookLoginUser = (userData) => async (dispatch) => {
  dispatch({
    type: FACEBOOK_LOGIN_REQUEST,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let sendData = {
    name: userData.name,
    email: userData.email,
  };

  const body = JSON.stringify(sendData);

  try {
    const response = await axios.post(
      `${API_URL}/customer/loginSocial`,
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    Toast.show("The user login is successful !", Toast.SHORT);
  } catch (err) {
    const errors = err?.response?.data?.errors;
    dispatch({
      type: LOGIN_ERROR,
    });
    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};

export const appleLoginUser = (userData) => async (dispatch) => {
  dispatch({
    type: "APPLE_LOGIN_REQUEST",
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let sendData = {
    name: userData.name || "",
    email: userData.email || "",
    identityToken: userData.identityToken,
  };

  const body = JSON.stringify(sendData);

  try {
    const response = await axios.post(
      `${API_URL}/customer/loginSocial/apple`,
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    Toast.show("The user login is successful !", Toast.SHORT);
  } catch (err) {
    const errors = err?.response?.data?.errors;
    dispatch({
      type: LOGIN_ERROR,
    });
    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};

export const googleLoginUser = (userData) => async (dispatch) => {
  dispatch({
    type: GOOGLE_LOGIN_REQUEST,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let sendData = {
    name: userData.name,
    email: userData.email,
  };

  const body = JSON.stringify(sendData);

  try {
    const response = await axios.post(
      `${API_URL}/customer/loginSocial`,
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    setTimeout(() => {
      Toast.show("The user login is successful !", Toast.SHORT);
    }, 500);
  } catch (err) {
    const errors = err?.response?.data?.errors;
    dispatch({
      type: LOGIN_ERROR,
    });
    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};

export const loginUserMobile = (data) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let sendData = {
    mobile: data,
  };

  const body = JSON.stringify(sendData);

  try {
    const response = await axios.post(
      `${API_URL}/customer/loginMobile`,
      body,
      config
    );

    Toast.show("The user login is successful !", Toast.SHORT);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    //console.log(err);
    const errors = err.response.data.errors;
    dispatch({
      type: LOGIN_ERROR,
    });
    if (errors) {
      errors.forEach((error) => Toast.show(error.message, Toast.SHORT));
    }
  }
};

export const LogOut = () => async (dispatch) => {
  dispatch({ type: EMPTY_CART });
  dispatch({
    type: USER_LOG_OUT,
  });
};

export const updateUserData = (userData) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_REQUEST,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let sendData = {
    name: userData.name,
    mobile: userData.number,
  };

  const body = JSON.stringify(sendData);

  try {
    const response = await axios.post(
      `${API_URL}/customer/update`,
      body,
      config
    );

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response.data,
    });

    Toast.show("Profile Updated Successfully !", Toast.SHORT);
  } catch (err) {
    const errors = err?.response?.data?.errors;
    dispatch({
      type: UPDATE_USER_ERROR,
    });
    if (errors) {
      errors?.forEach((error) => alert(error.message));
    }
  }
};
