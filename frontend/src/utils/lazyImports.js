import React from "react";

const importMap = {
  //USER :
  Register: () => import("../components/User/Register"),

  Profile: () => import("../components/User/Profile"),
  UpdateProfile: () => import("../components/User/UpdateProfile"),
  UpdatePassword: () => import("../components/User/UpdatePassword"),
  ForgotPassword: () => import("../components/User/ForgotPassword"),
  ResetPassword: () => import("../components/User/ResetPassword"),

  ProductDetail: () => import("../components/Products/ProductDetail"),
  ProductSearchDetails: () =>
    import("../components/Products/ProductSearchDetails"),

  CartComponent: () => import("../components/Cart/CartComponent"),
  Shipping: () => import("../components/Cart/Shipping"),

  ConfirmOrder: () => import("../components/Cart/ConfirmOrder"),
  Payment: () => import("../components/Cart/Payment"),
  OrderSuccess: () => import("../components/Cart/OrderSuccess"),
  UserOrders: () => import("../components/Order/UserOrders"),
  OrderDetail: () => import("../components/Order/OrderDetail"),

  //ADMIN :
  Dashboard: () => import("../components/Admin/Dashboard"),
  ProductList: () => import("../components/Admin/ProductList"),
  NewProduct: () => import("../components/Admin/NewProduct"),
  UpdateExistingProduct: () =>
    import("../components/Admin/UpdateExistingProduct"),
  OrderList: () => import("../components/Admin/OrderList"),
  UpdateExistingOrder: () => import("../components/Admin/UpdateExistingOrder"),
  UserLists: () => import("../components/Admin/UserLists"),
  UpdateExistingUser: () => import("../components/Admin/UpdateExisitngUser"),
  ReviewList: () => import("../components/Admin/ReviewList"),
};

export const lazyImport = (key) => {
  const importer = importMap[key];

  if (!importer) {
    throw new Error(`Lazy import not found for key: ${key}`);
  }

  return React.lazy(importer);
};
