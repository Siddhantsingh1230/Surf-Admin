import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice";
import productsReducer from "../slices/ProductSlice";
import categoryBrandreducer from "../slices/CategoryBrandSlice";
import orderReducer from "../slices/OrderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    productList: productsReducer,
    cab: categoryBrandreducer,
    orders:orderReducer,
  },
});
