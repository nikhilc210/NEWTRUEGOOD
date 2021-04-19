import {
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_ERROR,
  SET_ACTIVE_CATEGORY,
  SET_FILTER_ACTIVE_CATEGORY,
} from '../types';

const initialState = {
  categories: [],
  loading: true,
  activeCategory: '',
  filterCategory: '',
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_ALL_CATEGORIES_SUCCESS:
      return {...state, categories: payload, loading: false};

    case GET_ALL_CATEGORIES_ERROR:
      return {...state, loading: false};

    case SET_ACTIVE_CATEGORY:
      return {...state, activeCategory: payload, loading: false};

    case SET_FILTER_ACTIVE_CATEGORY:
      return {...state, filterCategory: payload, loading: false};

    default:
      return state;
  }
}
