import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartStore from './cartSlice';
import userSlice from "./userSlice";
import ordersSlice from "./ordersSlice"; // Import the orders slice

const reducer = combineReducers({
  cart: cartStore,
  user: userSlice,
  orders: ordersSlice, // Add orders slice here
});

export const store = configureStore({ reducer });
