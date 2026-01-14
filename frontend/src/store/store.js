import { combineReducers, configureStore } from "@reduxjs/toolkit";
//import { thunk } from "redux-thunk";

// USER
import productsReducer from "../reducer/productsSlice";
import productReducer from "../reducer/productSlice";
import authReducer from "../reducer/authSlice";
import cartReducer from "../reducer/cartSlice";
import orderReducer from "../reducer/orderSlice";

// ADMIN
import adminProductsReducer from "../reducer/admin/productsSlice";
import adminCreateProductReducer from "../reducer/admin/productSlice";
import adminOrderReducer from "../reducer/admin/orderSlice";
import adminUserReducer from "../reducer/admin/userSlice";
import adminReviewReducer from "../reducer/admin/reviewSlice";

const reducer = combineReducers({
  // USER
  productsState: productsReducer,
  productState: productReducer,
  authState: authReducer,
  cartState: cartReducer,
  orderState: orderReducer,

  //ADMIN
  admin_ProductsState: adminProductsReducer,
  admin_ProductState: adminCreateProductReducer,
  admin_OrderState: adminOrderReducer,
  admin_UserState: adminUserReducer,
  admin_ReviewState: adminReviewReducer,
});

export const store = configureStore({
  //    reducer : {}
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({ thunk: false }).concat(thunk),
  reducer,
});
