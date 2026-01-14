export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const PRODUCT_API = {
  GET_PRODUCTS: "/products",
  GET_PRODUCT: "/product",
};

export const CART_API = {
  PRODUCT: "/product",
};

export const REVIEW_API = {
  CREATE: "/review",
};

export const ORDER_API = {
  CREATE: "/order/new",
  GET: "/myorders",
  SHOW: "/order",
};

export const USER_API = {
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/logout",
  PROFILE: {
    GET: "/myprofile",
    UPDATE: "/update",
  },
  PASSWORD: {
    UPDATE: "/password/change",
    RESET: "/password/reset",
    FORGOT: "/password/forgot",
  },
};

// ---------------------------------------------------------------ADMIN PATHS------------------------------------------------------------

const ADMIN_USER = "/admin/user";

export const ADMIN = {
  PRODUCTS: {
    GET: "/admin/products",
  },
  PRODUCT: {
    CREATE_NEW: "/admin/product/new",
    UPDATE: "/admin/product",
    DELETE: "/admin/product",
  },
  USERS: {
    GET: "/admin/users",
    GET_SINGLE: ADMIN_USER,
    UPDATE: ADMIN_USER,
    DELETE: ADMIN_USER,
  },
  ORDER: {
    GET_ALL: "/admin/orders",
    DELETE: "/admin/order",
    UPDATE: "/admin/order",
  },
  REVIEWS: {
    GET: "/admin/reviews",
    DELETE: "/admin/review",
  },
};
