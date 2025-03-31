import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartStore from '../redux/cartSlice'
import userSlice from "./userSlice";

const reducer = combineReducers({
    cart: cartStore,
    user: userSlice
})

export const store = configureStore({ reducer })