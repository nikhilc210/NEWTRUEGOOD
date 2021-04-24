import {
  CHECK_INVENTORY_ERROR,
  CHECK_INVENTORY_REQUEST,
  CHECK_INVENTORY_SUCCESS,
} from "../types";
//API IMPORTS
import { API_URL } from "../../constants/url";
import axios from "axios";
import { navigate } from "../../navigations/RootNavigation";
//API IMPORTS

export const checkInventory = (order_details) => async (dispatch) => {
  dispatch({
    type: CHECK_INVENTORY_REQUEST,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let sendData = {
    order_line: order_details,
  };

  const body = JSON.stringify(sendData);

  try {
    const response = await axios.post(
      `${API_URL}/order/checkInventory`,
      body,
      config
    );

    if (response.data.length === 0) {
      navigate("ProceedToPay");
    }

    dispatch({
      type: CHECK_INVENTORY_SUCCESS,
      payload: response.data,
    });
    //Error send:::
  } catch (err) {
    console.log(err);
    const errors = err?.response?.data?.errors;
    dispatch({
      type: CHECK_INVENTORY_ERROR,
    });
    if (errors) {
      errors.forEach((error) => alert(error.message));
    }
  }
};
