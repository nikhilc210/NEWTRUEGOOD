//This is just like a boiler plate for a redux app it can be used in future..
import {createStore, applyMiddleware} from 'redux';

//Redux Persist
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'TRUEGOOD',
  storage: AsyncStorage,
  whitelist: ['cart'],
};

import thunk from 'redux-thunk'; //Thunk is middleware

import rootReducer from './reducers'; //this is equivalent to /reducers/index if we change the file name we have to add this..

//Persistance Reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(...middleware),
);
export const persistor = persistStore(store);
