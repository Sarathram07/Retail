import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: false,
    orderDetail: {},
    userOrders: [],
  },
  reducers: {
    createOrderRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    createOrderSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        orderDetail: action.payload.order,
      };
    },

    createOrderFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    clearOrderError(state, action) {
      return {
        ...state,
        error: null,
      };
    },

    // --------------------------------------------USER_ORDERS-------------------------------------------------------

    userOrdersRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    userOrderSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        userAllOrders: action.payload.orders,
      };
    },

    userOrdersFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    // --------------------------------------------USER_SINGLE_ORDERS_DETAIL-----------------------------------------------

    orderDetailRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    orderDetailSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        orderDetail: action.payload.order,
      };
    },

    orderDetailFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // --------------------------------------------REMOVE_ITEM----------------------------------------------------------
  },
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  clearOrderError,
} = orderSlice.actions;

export const { userOrdersRequest, userOrderSuccess, userOrdersFail } =
  orderSlice.actions;

export const { orderDetailRequest, orderDetailSuccess, orderDetailFail } =
  orderSlice.actions;

export default orderSlice.reducer;
