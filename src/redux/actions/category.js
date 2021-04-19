import axios from "axios";
import {
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_ERROR,
  SET_ACTIVE_CATEGORY,
  SET_PRODUCT_LOADING,
  SET_FILTER_ACTIVE_CATEGORY,
  SEARCH_PRODUCTS_REQUEST,
} from "../types";

//API IMPORTS
import { API_URL } from "../../constants/url";
import { getProuctsByCategoryId } from "./product";
import { filterProductOnCategory, searchProducts } from "./search";

export const getAllCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/category`);
    dispatch({
      type: GET_ALL_CATEGORIES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_CATEGORIES_ERROR,
    });
  }
};

export const setActiveCategory = (categoryId) => async (dispatch) => {
  dispatch({
    type: SET_ACTIVE_CATEGORY,
    payload: categoryId,
  });
  dispatch({
    type: SET_PRODUCT_LOADING,
  });
  dispatch(getProuctsByCategoryId(categoryId));
};

export const setActiveFilterCategory = (categoryId, type) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: SET_FILTER_ACTIVE_CATEGORY,
    payload: {
      categoryId,
      type,
    },
  });

  if (type !== "deselect") {
    dispatch({
      type: SEARCH_PRODUCTS_REQUEST,
    });
    dispatch(filterProductOnCategory(categoryId));
  } else {
    const state = getState();
    dispatch(searchProducts(state.search.query));
  }
};
