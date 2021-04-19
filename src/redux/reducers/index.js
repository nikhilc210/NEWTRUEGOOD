import {combineReducers} from 'redux';

//Imports Reducers
import category from './category';
import product from './product';
import cart from './cart';
import auth from './auth';
import sheet from './sheet';
import deliverySlotReducer from './DelieverySlotReducer';
import delivery from './delivery';
import otp from './otp';
import search from './search';
import inventory from './inventory';
import order from './order';

export default combineReducers({
  deliverySlotReducer,
  category,
  product,
  cart,
  auth,
  sheet,
  delivery,
  otp,
  search,
  inventory,
  order,
});
