import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "admin_products",
  initialState: {
    isLoading: false,
  },
  reducers: {
    adminProductsLoadingRequest(state, action) {
      return {
        isLoading: true,
      };
    },

    adminProductsSuccess(state, action) {
      return {
        isLoading: false,
        allProducts: action.payload.products,
      };
    },

    adminProductsFail(state, action) {
      return {
        isLoading: false,
        error: action.payload,
      };
    },

    clearAdminError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const { clearAdminError } = productsSlice.actions;

export const {
  adminProductsLoadingRequest,
  adminProductsSuccess,
  adminProductsFail,
} = productsSlice.actions;

export default productsSlice.reducer;
