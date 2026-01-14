import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "admin_order",
  initialState: {
    isLoading: false,
    isOrderUpdated: false,
    isOrderDeleted: false,
    orderDetail: {},
    userOrders: [],
    adminAllOrders: [],
  },
  reducers: {
    clearOrderError(state, action) {
      return {
        ...state,
        error: null,
      };
    },

    clearOrderDeleted(state, action) {
      return {
        ...state,
        isOrderDeleted: false,
      };
    },

    clearOrderUpdated(state, action) {
      return {
        ...state,
        isOrderUpdated: false,
      };
    },

    // --------------------------------------------ADMIN_ORDERS-------------------------------------------------------

    adminOrdersRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    adminOrderSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        adminAllOrders: action.payload.orders,
      };
    },

    adminOrderFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // ------------------------------------------------ADMIN_ORDERS_DELETE--------------------------------------------------

    deleteOrdersRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    deleteOrderSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        isOrderDeleted: true,
      };
    },

    deleteOrderFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // --------------------------------------------ADMIN_ORDER_UPDATE-----------------------------------------------

    updateOrderRequest(state, action) {
      return {
        ...state,
        isLoading: true,
      };
    },

    updateOrderSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        isOrderUpdated: true,
      };
    },

    updateOrderFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
  },
});

export const { adminOrdersRequest, adminOrderSuccess, adminOrderFail } =
  orderSlice.actions;

export const { deleteOrdersRequest, deleteOrderSuccess, deleteOrderFail } =
  orderSlice.actions;

export const { updateOrderRequest, updateOrderSuccess, updateOrderFail } =
  orderSlice.actions;

export const { clearOrderError, clearOrderDeleted, clearOrderUpdated } =
  orderSlice.actions;

export default orderSlice.reducer;
