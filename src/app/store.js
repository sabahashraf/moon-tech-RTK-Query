import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import cartSlice from "../features/cart/cartSlice";
import filterSlice from "../features/filter/filterSlice";
import { productApi } from "../features/api/apiSlice";
export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer, //auto reducer dichche productapi
    cart: cartSlice,
    filter: filterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, logger),
});
