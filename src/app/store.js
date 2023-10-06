import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../slices/AuthSlice";
import productsReducer from "../slices/ProductSlice";

export const store = configureStore({
  reducer: {
    auth:authReducer,
    productList:productsReducer,
  },
});
